using AutoMapper;
using MediatR;
using Robic.Repository;
using Robic.Service.Models;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Robic.Service.Query;

public class GetExerciseByIdHandler(
    IExerciseRepository exerciseRepository,
    IExerciseSetRepository exerciseSetRepository,
    IMapper mapper) : IRequestHandler<GetExerciseById, Exercise?>
{
    public async Task<Exercise?> Handle(GetExerciseById request, CancellationToken cancellationToken)
    {
        var repositoryExercise = await exerciseRepository.GetExerciseById(request.ExerciseId);
        if (repositoryExercise == null) return null;

        var sets = await exerciseSetRepository.GetExerciseSets(request.ExerciseId);

        var exercise = mapper.Map<Exercise>(repositoryExercise);
        exercise.Sets = mapper.Map<List<Set>>(sets);

        return exercise;
    }
}