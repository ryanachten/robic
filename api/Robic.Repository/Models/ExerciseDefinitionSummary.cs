using System.ComponentModel.DataAnnotations;

namespace Robic.Repository.Models;

public class ExerciseDefinitionSummary
{
    public required int Id { get; set; }
    public required string Title { get; set; }
    public required int SessionCount { get; set; }
    public DateTime? LastSessionDate { get; set; }

    [Range(0, 100, ErrorMessage = "Value for {0} must be a percentage between {1} and {2}")]
    public double? LastImprovement { get; set; }
}