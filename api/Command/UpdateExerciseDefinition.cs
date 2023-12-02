using MediatR;
using RobicServer.Models;

namespace RobicServer.Command;

public class UpdateExerciseDefinition : IRequest<ExerciseDefinition>
{
    public required ExerciseDefinition ExistingDefinition { get; set; }

    public required ExerciseDefinition UpdatedDefinition { get; set; }
}