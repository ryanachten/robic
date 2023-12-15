using MediatR;
using Robic.Service.Models;
using Robic.Service.Models.DTOs.Exercise;

namespace Robic.Service.Command;

public class CreateExercise : IRequest<Exercise>
{
    public required ExerciseDefinition Definition { get; set; }
    public required UpdateExerciseDto Exercise { get; set; }
}