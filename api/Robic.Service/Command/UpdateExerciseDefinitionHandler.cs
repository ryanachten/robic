using AutoMapper;
using MediatR;
using Robic.Repository;
using Robic.Service.Models;
using System.Threading;
using System.Threading.Tasks;

namespace Robic.Service.Command;

public class UpdateExerciseDefinitionHandler(IExerciseDefinitionRepository exerciseDefinitionRepository, IMapper mapper)
    : IRequestHandler<UpdateExerciseDefinition, ExerciseDefinition?>
{
    public async Task<ExerciseDefinition?> Handle(UpdateExerciseDefinition request, CancellationToken cancellationToken)
    {
        await exerciseDefinitionRepository.UpdateDefinition(new()
        {
            Id = request.DefinitionId,
            Title = request.UpdatedDefinition.Title,
            Unit = request.UpdatedDefinition.Unit,
        });
        var definition = await exerciseDefinitionRepository.GetDefinitionById(request.DefinitionId);
        return mapper.Map<ExerciseDefinition>(definition);
    }
}