using MediatR;
using Robic.Service.Models;

namespace Robic.Service.Command;

public class DeleteExercise : IRequest
{
    public required string ExerciseId { get; set; }
    public required ExerciseDefinition Definition { get; set; }
}