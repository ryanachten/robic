using MediatR;
using RobicServer.Models;

namespace RobicServer.Command;

public class CreateExerciseDefinition : IRequest<ExerciseDefinition>
{
    public required string UserId { get; set; }
    public required ExerciseDefinition Definition { get; set; }
}
