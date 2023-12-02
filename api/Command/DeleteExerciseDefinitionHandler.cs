using MediatR;
using RobicServer.Data;
using System.Threading;
using System.Threading.Tasks;

namespace RobicServer.Command;

public class DeleteExerciseDefinitionHandler : IRequestHandler<DeleteExerciseDefinition>
{
    private readonly IExerciseDefinitionRepository _definitionRepo;

    public DeleteExerciseDefinitionHandler(IUnitOfWork unitOfWork)
    {
        _definitionRepo = unitOfWork.ExerciseDefinitionRepo;
    }

    public async Task Handle(DeleteExerciseDefinition request, CancellationToken cancellationToken)
    {
        await _definitionRepo.DeleteDefinition(request.Definition);
    }
}