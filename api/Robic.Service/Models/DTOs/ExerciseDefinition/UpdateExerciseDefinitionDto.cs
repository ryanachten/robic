using Robic.Service.Models.Enums;
using System.Collections.Generic;

namespace Robic.Service.Models.DTOs.ExerciseDefinition;

public class UpdateExerciseDefinitionDto
{
    public required string Title { get; set; }
    public required string Unit { get; set; }
    public required int UserId { get; set; }
    public List<MuscleGroup> PrimaryMuscleGroup { get; set; } = [];
}
