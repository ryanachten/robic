using MediatR;
using RobicServer.Models;

namespace RobicServer.Query;

public class GetExerciseDefinitionById : IRequest<ExerciseDefinition>
{
    public required string DefinitionId { get; set; }
}
