using MediatR;
using Robic.Service.Data;
using Robic.Service.Models.Deprecated;
using System.Threading;
using System.Threading.Tasks;

namespace Robic.Service.Query;

public class GetExerciseDefinitionByIdHandler(IUnitOfWork unitOfWork) : IRequestHandler<GetExerciseDefinitionById, MongoExerciseDefinition?>
{
    public async Task<MongoExerciseDefinition?> Handle(GetExerciseDefinitionById request, CancellationToken cancellationToken)
    {
        var definition = await unitOfWork.ExerciseDefinitionRepo.GetExerciseDefinition(request.DefinitionId);
        if (definition != null)
            definition.PersonalBest = await unitOfWork.ExerciseRepo.GetPersonalBest(definition.Id);

        return definition;
    }
}
