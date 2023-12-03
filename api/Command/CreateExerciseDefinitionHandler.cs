using AutoMapper;
using MediatR;
using RobicServer.Data;
using RobicServer.Models;
using System.Threading;
using System.Threading.Tasks;

namespace RobicServer.Command;

public class CreateExerciseDefinitionHandler(IUnitOfWork unitOfWork, IMapper mapper) : IRequestHandler<CreateExerciseDefinition, ExerciseDefinition>
{
    public async Task<ExerciseDefinition> Handle(CreateExerciseDefinition request, CancellationToken cancellationToken)
    {
        var definition = mapper.Map<ExerciseDefinition>(request.Definition);
        return await unitOfWork.ExerciseDefinitionRepo.CreateDefinition(request.UserId, definition);
    }
}
