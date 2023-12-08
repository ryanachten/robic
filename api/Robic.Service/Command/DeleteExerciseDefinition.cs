using MediatR;
using Robic.Service.Models;

namespace Robic.Service.Command;

public class DeleteExerciseDefinition : IRequest
{
    public required ExerciseDefinition Definition { get; set; }
}