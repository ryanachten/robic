namespace Robic.Service.Models.DTOs.ExerciseDefinition;

public class UpdateExerciseDefinitionDto
{
    public required string Title { get; set; }
    public required string Unit { get; set; }
    public required string Type { get; set; }
    public required string User { get; set; }
}
