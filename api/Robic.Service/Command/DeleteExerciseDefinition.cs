using MediatR;
using Robic.Service.Models.Deprecated;

namespace Robic.Service.Command;

public class DeleteExerciseDefinition : IRequest
{
    public required MongoExerciseDefinition Definition { get; set; }
}