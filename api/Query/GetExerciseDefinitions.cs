using MediatR;
using RobicServer.Models;
using System.Collections.Generic;

namespace RobicServer.Query;

public class GetExerciseDefinitions : IRequest<IEnumerable<ExerciseDefinition>>
{
    public required string UserId { get; set; }
}
