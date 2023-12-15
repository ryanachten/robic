using AutoMapper;
using MediatR;
using Robic.Repository;
using Robic.Repository.Models.DTOs.ExerciseDefinition;
using Robic.Service.Models.Deprecated;
using System.Threading;
using System.Threading.Tasks;

namespace Robic.Service.Command;

public class CreateExerciseDefinitionHandler(IExerciseDefinitionRepository exerciseDefinitionRepository, IMapper mapper) : IRequestHandler<CreateExerciseDefinition, ExerciseDefinition>
{
    public async Task<ExerciseDefinition> Handle(CreateExerciseDefinition request, CancellationToken cancellationToken)
    {
        await exerciseDefinitionRepository.CreateDefinition(new CreateExerciseDefinitionDto()
        {
            Title = request.Definition.Title,
            Unit = request.Definition.Unit,
            UserId = request.UserId
        });

        var definition = await exerciseDefinitionRepository.GetDefinitionByTitle(request.UserId, request.Definition.Title);
        return mapper.Map<ExerciseDefinition>(definition);
    }
}
