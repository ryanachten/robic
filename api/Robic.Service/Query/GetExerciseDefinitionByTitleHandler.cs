using AutoMapper;
using MediatR;
using Robic.Repository;
using Robic.Service.Models.Deprecated;
using System.Threading;
using System.Threading.Tasks;

namespace Robic.Service.Query;

public class GetExerciseDefinitionByTitleHandler(IExerciseDefinitionRepository exerciseDefinitionRepository, IMapper mapper) : IRequestHandler<GetExerciseDefinitionByTitle, ExerciseDefinition?>
{
    public async Task<ExerciseDefinition?> Handle(GetExerciseDefinitionByTitle request, CancellationToken cancellationToken)
    {
        var definition = await exerciseDefinitionRepository.GetDefinitionByTitle(request.UserId, request.Title);
        return mapper.Map<ExerciseDefinition>(definition);
    }
}
