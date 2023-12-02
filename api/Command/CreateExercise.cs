using MediatR;
using RobicServer.Models;

namespace RobicServer.Command;

public class CreateExercise : IRequest<Exercise>
{
    public required ExerciseDefinition Definition { get; set; }
    public required Exercise Exercise { get; set; }
}