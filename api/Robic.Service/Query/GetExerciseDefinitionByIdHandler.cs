using AutoMapper;
using MediatR;
using Robic.Repository;
using Robic.Service.Models;
using Robic.Service.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Robic.Service.Query;

// TODO: this contract is massive - let's break it up into multiple endpoints
public class GetExerciseDefinitionByIdHandler(
    IExerciseDefinitionRepository exerciseDefinitionRepository,
    IExerciseRepository exerciseRepository,
    IExerciseSetRepository exerciseSetRepository,
    IExerciseMuscleGroupRepository exerciseMuscleGroupRepository,
    IMapper mapper) : IRequestHandler<GetExerciseDefinitionById, ExerciseDefinition?>
{
    public async Task<ExerciseDefinition?> Handle(GetExerciseDefinitionById request, CancellationToken cancellationToken)
    {
        var repositoryDefinition = await exerciseDefinitionRepository.GetDefinitionById(request.DefinitionId);
        if (repositoryDefinition == null) return null;

        var primaryMuscleGroups = GetPrimaryMuscleGroups(repositoryDefinition.Id);
        var latestExercise = GetLatestExercise(repositoryDefinition.Id);
        var personalBest = GetPersonalBestExercise(repositoryDefinition.Id);
        var exerciseHistory = GetExerciseHistory(repositoryDefinition.Id);

        await Task.WhenAll(primaryMuscleGroups, latestExercise, personalBest, exerciseHistory);

        var definition = mapper.Map<ExerciseDefinition>(repositoryDefinition);
        definition.PrimaryMuscleGroup = primaryMuscleGroups.Result;
        definition.LatestSession = latestExercise.Result;
        definition.PersonalBest = personalBest.Result;
        definition.History = exerciseHistory.Result;

        return definition;
    }

    private async Task<List<MuscleGroup>> GetPrimaryMuscleGroups(int definitionId)
    {
        var muscleGroupResponse = await exerciseMuscleGroupRepository.GetDefinitionMuscleGroups(definitionId);
        return muscleGroupResponse.Select(mg => Enum.Parse<MuscleGroup>(mg)).ToList();
    }

    private async Task<List<ExerciseHistoryItem>> GetExerciseHistory(int definitionId)
    {
        var historyResponse = await exerciseRepository.GetExerciseHistory(definitionId);
        return mapper.Map<List<ExerciseHistoryItem>>(historyResponse);
    }

    private async Task<Exercise?> GetLatestExercise(int definitionId)
    {
        var exerciseResult = await exerciseRepository.GetLatestDefinitionExercise(definitionId);
        if (exerciseResult == null) return null;

        var latestSets = await exerciseSetRepository.GetExerciseSets(exerciseResult.Id);

        var latestExercise = mapper.Map<Exercise>(exerciseResult);
        latestExercise.Sets = mapper.Map<List<Set>>(latestSets);

        return latestExercise;
    }

    private async Task<PersonalBest?> GetPersonalBestExercise(int definitionId)
    {
        var setResult = await exerciseSetRepository.GetPersonalBestExerciseSets(definitionId);
        if (!setResult.Any()) return null;

        var exerciseResult = await exerciseRepository.GetExerciseById(setResult.First().ExerciseId);
        if (exerciseResult == null) return null;

        var personalBestExercise = mapper.Map<Exercise>(exerciseResult);
        personalBestExercise.Sets = mapper.Map<List<Set>>(setResult);

        var personalBestResult = await exerciseSetRepository.GetPersonalBestMaxValues(definitionId);
        var personalBest = mapper.Map<PersonalBest>(personalBestResult);
        personalBest.TopNetExercise = personalBestExercise;

        return personalBest;
    }
}
