namespace Robic.Repository.Models.DTOs.ExerciseDefinition;

public class CreateExerciseDefinitionDto
{
    public required string Title { get; set; }
    public required string Unit { get; set; }
    public required int UserId { get; set; }
}
