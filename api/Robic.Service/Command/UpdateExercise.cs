using MediatR;
using Robic.Service.Models;
using Robic.Service.Models.DTOs.Exercise;

namespace Robic.Service.Command;

public class UpdateExercise : IRequest<Exercise>
{
    public required int ExerciseId { get; set; }
    public required UpdateExerciseDto Exercise { get; set; }
}