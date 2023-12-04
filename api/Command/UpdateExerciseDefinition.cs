using MediatR;
using RobicServer.Models;
using RobicServer.Models.DTOs.ExerciseDefinition;

namespace RobicServer.Command;

public class UpdateExerciseDefinition : IRequest<ExerciseDefinition>
{
    public required ExerciseDefinition ExistingDefinition { get; set; }

    public required UpdateExerciseDefinitionDto UpdatedDefinition { get; set; }
}