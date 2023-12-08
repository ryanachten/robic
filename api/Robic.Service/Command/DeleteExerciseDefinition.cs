using MediatR;
using RobicServer.Models;

namespace RobicServer.Command;

public class DeleteExerciseDefinition : IRequest
{
    public required ExerciseDefinition Definition { get; set; }
}