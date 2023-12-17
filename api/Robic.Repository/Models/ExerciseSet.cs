namespace Robic.Repository.Models;

public class ExerciseSet
{
    public int Id { get; set; }
    public required int ExerciseId { get; set; }
    public required int SetOrder { get; set; }
    public required int Reps { get; set; }
    public required double Value { get; set; }
}
