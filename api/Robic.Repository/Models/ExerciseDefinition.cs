using Robic.Repository.Models.Enums;

namespace Robic.Repository.Models;

public class ExerciseDefinition
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public required Unit Unit { get; set; }
    public required int UserId { get; set; }
    public double? LastImprovement { get; set; }
}
