using System;
using System.Collections.Generic;

namespace Robic.Service.Models.DTOs.Exercise;

public class UpdateExerciseDto
{
    public required string Definition { get; set; }
    public DateTime Date { get; set; }
    public DateTime TimeTaken { get; set; }
    public List<UpdateSetDto> Sets { get; set; } = [];
}
