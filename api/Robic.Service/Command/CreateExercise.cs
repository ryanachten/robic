using MediatR;
using RobicServer.Models;
using RobicServer.Models.DTOs.Exercise;

namespace RobicServer.Command;

public class CreateExercise : IRequest<Exercise>
{
    public required ExerciseDefinition Definition { get; set; }
    public required UpdateExerciseDto Exercise { get; set; }
}