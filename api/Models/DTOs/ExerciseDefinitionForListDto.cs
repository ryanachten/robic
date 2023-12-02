using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RobicServer.Models.DTOs;

public class ExerciseDefinitionForListDto
{
    public required string Id { get; set; }
    public required string Title { get; set; }
    public List<string> History { get; set; } = [];

#nullable enable
    public Exercise? LastSession { get; set; }

    [Range(0, 100, ErrorMessage = "Value for {0} must be a percentage between {1} and {2}")]
    public double? LastImprovement { get; set; }
}