using MediatR;
using Robic.Repository;
using System.Threading;
using System.Threading.Tasks;

namespace Robic.Service.Command;

public class DeleteExerciseHandler(
    IExerciseRepository exerciseRepository,
    IExerciseSetRepository exerciseSetRepository) : IRequestHandler<DeleteExercise>
{
    public async Task Handle(DeleteExercise request, CancellationToken cancellationToken)
    {
        await exerciseSetRepository.DeleteExerciseSets(request.ExerciseId);
        await exerciseRepository.DeleteExerciseById(request.ExerciseId);
    }
}