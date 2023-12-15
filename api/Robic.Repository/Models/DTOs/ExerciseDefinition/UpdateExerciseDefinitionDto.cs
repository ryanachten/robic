namespace Robic.Repository.Models.DTOs.ExerciseDefinition;

public class UpdateExerciseDefinitionDto
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public required string Unit { get; set; }
}
