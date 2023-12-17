using AutoMapper;
using MediatR;
using Robic.Repository;
using Robic.Service.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using RepositorySet = Robic.Repository.Models.ExerciseSet;

namespace Robic.Service.Command;

public class CreateExerciseHandler(
    IExerciseRepository exerciseRepository,
    IExerciseSetRepository exerciseSetRepository,
    IMapper mapper) : IRequestHandler<CreateExercise, Exercise>
{
    public async Task<Exercise> Handle(CreateExercise request, CancellationToken cancellationToken)
    {
        var createdExercise = await exerciseRepository.CreateExercise(new()
        {
            Date = request.Exercise.Date,
            DefinitionId = request.Exercise.DefinitionId,
            TimeTaken = request.Exercise.TimeTaken,
            UserId = request.UserId,
        });

        var sets = mapper.Map<List<RepositorySet>>(request.Exercise.Sets);
        await exerciseSetRepository.CreateSet(sets.Select((RepositorySet set, int i) =>
        {
            set.SetOrder = i;
            set.ExerciseId = createdExercise.Id;
            return set;
        }));

        var createdSets = await exerciseSetRepository.GetExerciseSets(createdExercise.Id);
        var exercise = mapper.Map<Exercise>(createdExercise);
        exercise.Sets = mapper.Map<List<Set>>(createdSets);

        return exercise;
    }
}