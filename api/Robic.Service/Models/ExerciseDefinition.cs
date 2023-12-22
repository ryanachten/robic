using System.Collections.Generic;

namespace Robic.Service.Models;

public class ExerciseDefinition
{
    public required int Id { get; set; }
    public required string Title { get; set; }

    // TODO: should be enum or something
    public required string Unit { get; set; }
    public required int UserId { get; set; }
    public List<ExerciseHistoryItem> History { get; set; } = [];

    // TODO: should be enum or something
    public List<string> PrimaryMuscleGroup { get; set; } = [];
    public Exercise? LatestSession { get; set; }
    public PersonalBest? PersonalBest { get; set; }
}