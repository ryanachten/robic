using MediatR;
using RobicServer.Data;
using RobicServer.Models;
using System.Threading;
using System.Threading.Tasks;

namespace RobicServer.Command;

public class CreateExerciseDefinitionHandler(IUnitOfWork unitOfWork) : IRequestHandler<CreateExerciseDefinition, ExerciseDefinition>
{
    public async Task<ExerciseDefinition> Handle(CreateExerciseDefinition request, CancellationToken cancellationToken)
    {
        return await unitOfWork.ExerciseDefinitionRepo.CreateDefinition(request.UserId, request.Definition);
    }
}
