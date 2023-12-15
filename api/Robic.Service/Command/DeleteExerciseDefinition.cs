using MediatR;

namespace Robic.Service.Command;

public class DeleteExerciseDefinition : IRequest
{
    public required int DefinitionId { get; set; }
}