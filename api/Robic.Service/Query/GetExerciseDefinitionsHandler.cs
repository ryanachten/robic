using AutoMapper;
using MediatR;
using Robic.Repository;
using Robic.Repository.Models.Enums;
using Robic.Service.Models;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Robic.Service.Query;

public class GetExerciseDefinitionsHandler(
    IExerciseDefinitionRepository exerciseDefinitionRepository,
    IMapper mapper) : IRequestHandler<GetExerciseDefinitions, IEnumerable<ExerciseDefinitionSummary>>
{
    // TODO: add pagination
    public async Task<IEnumerable<ExerciseDefinitionSummary>> Handle(GetExerciseDefinitions request, CancellationToken cancellationToken)
    {
        var sortField = mapper.Map<ExerciseDefinitionSortField?>(request.SortField);
        var direction = mapper.Map<SortDirection?>(request.Direction);

        var definitions = await exerciseDefinitionRepository.GetDefinitionSummaries(
            request.UserId,
            sortField ?? ExerciseDefinitionSortField.TITLE,
            direction ?? SortDirection.ASC
        );
        return mapper.Map<List<ExerciseDefinitionSummary>>(definitions);
    }
}
