using MediatR;
using Robic.Service.Models;
using System.Collections.Generic;

namespace Robic.Service.Query;

public class GetExerciseDefinitions : IRequest<IEnumerable<ExerciseDefinitionSummary>>
{
    public required int UserId { get; set; }
}
