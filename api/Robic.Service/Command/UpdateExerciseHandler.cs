using AutoMapper;
using MediatR;
using Robic.Repository;
using Robic.Service.Models;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using RepositoryExerciseDtos = Robic.Repository.Models.DTOs.Exercise;

namespace Robic.Service.Command;

public class UpdateExerciseHandler(
    IExerciseRepository exerciseRepository,
    IExerciseSetRepository exerciseSetRepository,
    IMapper mapper) : IRequestHandler<UpdateExercise, Exercise>
{
    public async Task<Exercise> Handle(UpdateExercise request, CancellationToken cancellationToken)
    {
        var updatedExercise = mapper.Map<RepositoryExerciseDtos.UpdateExerciseDto>(request.Exercise);
        await exerciseRepository.UpdateExercise(request.ExerciseId, updatedExercise);

        await exerciseSetRepository.DeleteExerciseSets(request.ExerciseId);

        var updatedSets = mapper.Map<List<RepositoryExerciseDtos.CreateExerciseSetDto>>(request.Exercise.Sets);
        await exerciseSetRepository.CreateSet(request.ExerciseId, updatedSets);

        return mapper.Map<Exercise>(request.Exercise);
    }
}