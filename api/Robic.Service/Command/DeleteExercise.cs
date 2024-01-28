using MediatR;

namespace Robic.Service.Command;

public class DeleteExercise : IRequest
{
    public required int ExerciseId { get; set; }
}