using MediatR;
using RobicServer.Data;
using System.Threading;
using System.Threading.Tasks;

namespace RobicServer.Command;

public class DeleteExerciseHandler(IUnitOfWork unitOfWork) : IRequestHandler<DeleteExercise>
{
    public async Task Handle(DeleteExercise request, CancellationToken cancellationToken)
    {
        await unitOfWork.ExerciseRepo.DeleteExercise(request.ExerciseId, request.Definition);

    }
}