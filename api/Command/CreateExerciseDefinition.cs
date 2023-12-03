using MediatR;
using RobicServer.Models;
using RobicServer.Models.DTOs.ExerciseDefinition;

namespace RobicServer.Command;

public class CreateExerciseDefinition : IRequest<ExerciseDefinition>
{
    public required string UserId { get; set; }
    public required UpdateExerciseDefinitionDto Definition { get; set; }
}
