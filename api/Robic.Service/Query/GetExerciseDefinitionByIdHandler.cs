using AutoMapper;
using MediatR;
using Robic.Repository;
using Robic.Service.Models;
using System.Threading;
using System.Threading.Tasks;

namespace Robic.Service.Query;

public class GetExerciseDefinitionByIdHandler(IExerciseDefinitionRepository exerciseDefinitionRepository, IMapper mapper) : IRequestHandler<GetExerciseDefinitionById, ExerciseDefinition?>
{
    public async Task<ExerciseDefinition?> Handle(GetExerciseDefinitionById request, CancellationToken cancellationToken)
    {
        var definition = await exerciseDefinitionRepository.GetDefinitionById(request.DefinitionId);
        // TODO: implement personal best
        //if (definition != null)
        //    definition.PersonalBest = await unitOfWork.ExerciseRepo.GetPersonalBest(definition.Id);

        return mapper.Map<ExerciseDefinition>(definition);
    }
}
