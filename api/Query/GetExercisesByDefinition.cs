using MediatR;
using RobicServer.Models;
using System.Collections.Generic;

namespace RobicServer.Query;

public class GetExercisesByDefinition : IRequest<IEnumerable<Exercise>>
{
    public required string DefinitionId { get; set; }
}