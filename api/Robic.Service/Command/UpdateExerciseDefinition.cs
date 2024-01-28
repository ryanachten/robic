using MediatR;
using Robic.Service.Models;
using Robic.Service.Models.DTOs.ExerciseDefinition;

namespace Robic.Service.Command;

public class UpdateExerciseDefinition : IRequest<ExerciseDefinition?>
{
    public required int DefinitionId { get; set; }
    public required UpdateExerciseDefinitionDto UpdatedDefinition { get; set; }
}