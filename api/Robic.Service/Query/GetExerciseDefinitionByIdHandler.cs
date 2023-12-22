using AutoMapper;
using MediatR;
using Microsoft.IdentityModel.Tokens;
using Robic.Repository;
using Robic.Service.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Robic.Service.Query;

public class GetExerciseDefinitionByIdHandler(
    IExerciseDefinitionRepository exerciseDefinitionRepository,
    IExerciseRepository exerciseRepository,
    IExerciseSetRepository exerciseSetRepository,
    IMapper mapper) : IRequestHandler<GetExerciseDefinitionById, ExerciseDefinition?>
{
    public async Task<ExerciseDefinition?> Handle(GetExerciseDefinitionById request, CancellationToken cancellationToken)
    {
        var repositoryDefinition = await exerciseDefinitionRepository.GetDefinitionById(request.DefinitionId);
        if (repositoryDefinition == null) return null;

        var definition = mapper.Map<ExerciseDefinition>(repositoryDefinition);
        definition.LatestSession = await GetLatestExercise(definition.Id);
        definition.PersonalBest = await GetPersonalBestExercise(definition.Id);

        return definition;
    }

    private async Task<Exercise?> GetLatestExercise(int definitionId)
    {
        var repositoryExercise = await exerciseRepository.GetLatestDefinitionExercise(definitionId);
        if (repositoryExercise == null) return null;

        var latestSets = await exerciseSetRepository.GetExerciseSets(repositoryExercise.Id);

        var latestExercise = mapper.Map<Exercise>(repositoryExercise);
        latestExercise.Sets = mapper.Map<List<Set>>(latestSets);

        return latestExercise;
    }

    private async Task<Exercise?> GetPersonalBestExercise(int definitionId)
    {
        var exerciseSets = await exerciseSetRepository.GetPersonalBestSets(definitionId);
        if (exerciseSets.IsNullOrEmpty()) return null;

        var repositoryExercise = await exerciseRepository.GetExerciseById(exerciseSets.First().ExerciseId);
        if (repositoryExercise == null) return null;

        var personalBestExercise = mapper.Map<Exercise>(repositoryExercise);
        personalBestExercise.Sets = mapper.Map<List<Set>>(exerciseSets);

        return personalBestExercise;
    }
}
