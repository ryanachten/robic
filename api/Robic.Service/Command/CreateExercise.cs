using MediatR;
using Robic.Service.Models;
using Robic.Service.Models.DTOs.Exercise;

namespace Robic.Service.Command;

public class CreateExercise : IRequest<Exercise>
{
    public required int UserId { get; set; }
    public required UpdateExerciseDto Exercise { get; set; }
}