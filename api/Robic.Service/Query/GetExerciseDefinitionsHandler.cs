using AutoMapper;
using MediatR;
using Robic.Repository;
using Robic.Service.Models.DTOs.ExerciseDefinition;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Robic.Service.Query;

public class GetExerciseDefinitionsHandler(IExerciseDefinitionRepository exerciseDefinitionRepository, IMapper mapper) : IRequestHandler<GetExerciseDefinitions, IEnumerable<ListExerciseDefinitionDto>>
{
    public async Task<IEnumerable<ListExerciseDefinitionDto>> Handle(GetExerciseDefinitions request, CancellationToken cancellationToken)
    {
        var definitions = await exerciseDefinitionRepository.GetUserDefinitions(request.UserId);
        return mapper.Map<List<ListExerciseDefinitionDto>>(definitions);
    }
}
