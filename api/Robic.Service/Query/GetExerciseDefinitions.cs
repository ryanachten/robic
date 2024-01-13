using MediatR;
using Robic.Service.Models;
using Robic.Service.Models.Enums;
using System.Collections.Generic;

namespace Robic.Service.Query;

public class GetExerciseDefinitions : IRequest<IEnumerable<ExerciseDefinitionSummary>>
{
    public required int UserId { get; set; }
    public ExerciseDefinitionSortField? SortField { get; set; }
    public SortDirection? Direction { get; set; }
}
