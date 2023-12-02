using MediatR;
using RobicServer.Data;
using RobicServer.Models;
using System.Threading;
using System.Threading.Tasks;

namespace RobicServer.Command;

public class UpdateExerciseDefinitionHandler(IUnitOfWork unitOfWork) : IRequestHandler<UpdateExerciseDefinition, ExerciseDefinition>
{
    public async Task<ExerciseDefinition> Handle(UpdateExerciseDefinition request, CancellationToken cancellationToken)
    {
        return await unitOfWork.ExerciseDefinitionRepo.UpdateDefinition(request.ExistingDefinition, request.UpdatedDefinition);
    }
}