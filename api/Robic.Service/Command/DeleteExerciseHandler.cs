using MediatR;
using Robic.Service.Data;
using System.Threading;
using System.Threading.Tasks;

namespace Robic.Service.Command;

public class DeleteExerciseHandler(IUnitOfWork unitOfWork) : IRequestHandler<DeleteExercise>
{
    public async Task Handle(DeleteExercise request, CancellationToken cancellationToken)
    {
        await unitOfWork.ExerciseRepo.DeleteExercise(request.ExerciseId, request.Definition);
    }
}