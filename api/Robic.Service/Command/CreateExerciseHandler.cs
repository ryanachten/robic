using AutoMapper;
using MediatR;
using Robic.Repository;
using Robic.Service.Models;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using RepositoryExerciseDtos = Robic.Repository.Models.DTOs.Exercise;

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

        var sets = mapper.Map<List<RepositoryExerciseDtos.CreateExerciseSetDto>>(request.Exercise.Sets);
        await exerciseSetRepository.CreateSet(createdExercise.Id, sets);

        var createdSets = await exerciseSetRepository.GetExerciseSets(createdExercise.Id);
        var exercise = mapper.Map<Exercise>(createdExercise);
        exercise.Sets = mapper.Map<List<Set>>(createdSets);

        return exercise;
    }
}