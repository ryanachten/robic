using MediatR;
using Robic.Service.Data;
using System.Threading;
using System.Threading.Tasks;

namespace Robic.Service.Command;

public class DeleteExerciseDefinitionHandler(IUnitOfWork unitOfWork) : IRequestHandler<DeleteExerciseDefinition>
{
    public async Task Handle(DeleteExerciseDefinition request, CancellationToken cancellationToken)
    {
        await unitOfWork.ExerciseDefinitionRepo.DeleteDefinition(request.Definition);
    }
}