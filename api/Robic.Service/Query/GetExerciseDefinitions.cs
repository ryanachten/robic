using MediatR;
using Robic.Service.Models;
using System.Collections.Generic;

namespace Robic.Service.Query;

public class GetExerciseDefinitions : IRequest<IEnumerable<ExerciseDefinition>>
{
    public required string UserId { get; set; }
}
