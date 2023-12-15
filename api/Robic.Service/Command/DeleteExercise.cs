using MediatR;
using Robic.Service.Models.Deprecated;

namespace Robic.Service.Command;

public class DeleteExercise : IRequest
{
    public required string ExerciseId { get; set; }
    public required MongoExerciseDefinition Definition { get; set; }
}