using MediatR;
using Robic.Service.Models.Deprecated;
using Robic.Service.Models.DTOs.ExerciseDefinition;

namespace Robic.Service.Command;

public class UpdateExerciseDefinition : IRequest<MongoExerciseDefinition>
{
    public required MongoExerciseDefinition ExistingDefinition { get; set; }

    public required UpdateExerciseDefinitionDto UpdatedDefinition { get; set; }
}