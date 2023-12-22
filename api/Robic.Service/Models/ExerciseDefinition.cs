using Robic.Service.Models.Enums;
using System.Collections.Generic;

namespace Robic.Service.Models;

public class ExerciseDefinition
{
    public required int Id { get; set; }
    public required int UserId { get; set; }
    public required string Title { get; set; }
    public required Unit Unit { get; set; }
    public List<ExerciseHistoryItem> History { get; set; } = [];
    public List<MuscleGroup> PrimaryMuscleGroup { get; set; } = [];
    public Exercise? LatestSession { get; set; }
    public PersonalBest? PersonalBest { get; set; }
}