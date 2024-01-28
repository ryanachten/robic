namespace Robic.Repository.Models.DTOs.Exercise;

public class CreateExerciseSetDto
{
    public required int Reps { get; set; }
    public required double Value { get; set; }
}
