using AutoMapper;
using MediatR;
using Robic.Service.Data;
using Robic.Service.Models.Deprecated;
using System.Threading;
using System.Threading.Tasks;

namespace Robic.Service.Command;

public class UpdateExerciseDefinitionHandler(IUnitOfWork unitOfWork, IMapper mapper) : IRequestHandler<UpdateExerciseDefinition, MongoExerciseDefinition>
{
    public async Task<MongoExerciseDefinition> Handle(UpdateExerciseDefinition request, CancellationToken cancellationToken)
    {
        var definition = mapper.Map<MongoExerciseDefinition>(request.UpdatedDefinition);
        return await unitOfWork.ExerciseDefinitionRepo.UpdateDefinition(request.ExistingDefinition, definition);
    }
}