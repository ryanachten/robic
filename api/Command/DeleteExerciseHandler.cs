using MediatR;
using RobicServer.Data;
using System.Threading;
using System.Threading.Tasks;

namespace RobicServer.Command;

public class DeleteExerciseHandler : IRequestHandler<DeleteExercise>
{
    private readonly IExerciseRepository _exerciseRepo;

    public DeleteExerciseHandler(IUnitOfWork unitOfWork)
    {
        _exerciseRepo = unitOfWork.ExerciseRepo;
    }

    public async Task Handle(DeleteExercise request, CancellationToken cancellationToken)
    {
        await _exerciseRepo.DeleteExercise(request.ExerciseId, request.Definition);

    }
}