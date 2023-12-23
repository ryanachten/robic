using AutoMapper;
using MediatR;
using Robic.Repository;
using Robic.Service.Models;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Robic.Service.Query;

public class GetExerciseDefinitionsHandler(
    IExerciseDefinitionRepository exerciseDefinitionRepository,
    IMapper mapper) : IRequestHandler<GetExerciseDefinitions, IEnumerable<ExerciseDefinitionSummary>>
{
    // TODO: add pagination and ordering support
    public async Task<IEnumerable<ExerciseDefinitionSummary>> Handle(GetExerciseDefinitions request, CancellationToken cancellationToken)
    {
        var definitions = await exerciseDefinitionRepository.GetDefinitionSummaries(request.UserId);
        return mapper.Map<List<ExerciseDefinitionSummary>>(definitions);
    }
}
