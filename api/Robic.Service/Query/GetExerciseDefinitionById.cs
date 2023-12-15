using MediatR;
using Robic.Service.Models;

namespace Robic.Service.Query;

public class GetExerciseDefinitionById : IRequest<ExerciseDefinition>
{
    public required int DefinitionId { get; set; }
}
