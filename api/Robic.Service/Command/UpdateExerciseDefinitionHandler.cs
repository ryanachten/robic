using AutoMapper;
using MediatR;
using Robic.Service.Data;
using Robic.Service.Models;
using System.Threading;
using System.Threading.Tasks;

namespace Robic.Service.Command;

public class UpdateExerciseDefinitionHandler(IUnitOfWork unitOfWork, IMapper mapper) : IRequestHandler<UpdateExerciseDefinition, ExerciseDefinition>
{
    public async Task<ExerciseDefinition> Handle(UpdateExerciseDefinition request, CancellationToken cancellationToken)
    {
        var definition = mapper.Map<ExerciseDefinition>(request.UpdatedDefinition);
        return await unitOfWork.ExerciseDefinitionRepo.UpdateDefinition(request.ExistingDefinition, definition);
    }
}