using MediatR;
using RobicServer.Models;

namespace RobicServer.Command;

public class DeleteExercise : IRequest
{
    public required string ExerciseId { get; set; }
    public required ExerciseDefinition Definition { get; set; }
}