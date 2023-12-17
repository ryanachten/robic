using MediatR;
using Robic.Service.Models;
using System.Collections.Generic;

namespace Robic.Service.Query;

public class GetExercisesByDefinition : IRequest<IEnumerable<Exercise>>
{
    public required int DefinitionId { get; set; }
    public required int UserId { get; set; }
}