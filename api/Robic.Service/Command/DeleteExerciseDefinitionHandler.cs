using MediatR;
using Robic.Repository;
using System.Threading;
using System.Threading.Tasks;

namespace Robic.Service.Command;

public class DeleteExerciseDefinitionHandler(IExerciseDefinitionRepository exerciseDefinitionRepository) : IRequestHandler<DeleteExerciseDefinition>
{
    public async Task Handle(DeleteExerciseDefinition request, CancellationToken cancellationToken)
    {
        await exerciseDefinitionRepository.DeleteDefinitionById(request.DefinitionId);
    }
}