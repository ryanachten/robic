using System.Collections.Generic;

namespace Robic.Service.Models;

public class ExerciseDefinition
{
    public required int Id { get; set; }
    public required string Title { get; set; }

    // TODO: should be enum or something
    public required string Unit { get; set; }
    public required int UserId { get; set; }
    public List<string> History { get; set; } = [];

    // TODO: should be enum or something
    public List<string> PrimaryMuscleGroup { get; set; } = [];
}