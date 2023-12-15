using MediatR;
using Robic.Service.Models.Deprecated;
using Robic.Service.Models.DTOs.ExerciseDefinition;

namespace Robic.Service.Command;

public class CreateExerciseDefinition : IRequest<ExerciseDefinition>
{
    public required int UserId { get; set; }
    public required UpdateExerciseDefinitionDto Definition { get; set; }
}
