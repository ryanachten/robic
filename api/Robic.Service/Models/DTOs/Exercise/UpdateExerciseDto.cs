using System;
using System.Collections.Generic;

namespace Robic.Service.Models.DTOs.Exercise;

public class UpdateExerciseDto
{
    public required int DefinitionId { get; set; }
    public DateTime Date { get; set; }
    public DateTime? TimeTaken { get; set; }
    public List<Set> Sets { get; set; } = [];
}
