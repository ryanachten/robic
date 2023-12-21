using AutoMapper;
using MediatR;
using Robic.Repository;
using Robic.Service.Models;
using System.Threading;
using System.Threading.Tasks;

namespace Robic.Service.Command;

public class CreateExerciseDefinitionHandler(IExerciseDefinitionRepository exerciseDefinitionRepository, IMapper mapper) : IRequestHandler<CreateExerciseDefinition, ExerciseDefinition>
{
    public async Task<ExerciseDefinition> Handle(CreateExerciseDefinition request, CancellationToken cancellationToken)
    {
        var definition = mapper.Map<Repository.Models.ExerciseDefinition>(request.Definition);
        await exerciseDefinitionRepository.CreateDefinition(definition);

        return mapper.Map<ExerciseDefinition>(definition);
    }
}
