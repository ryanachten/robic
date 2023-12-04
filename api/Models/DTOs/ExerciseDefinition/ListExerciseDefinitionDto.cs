using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using ExerciseModel = RobicServer.Models.Exercise;

namespace RobicServer.Models.DTOs.ExerciseDefinition;

public class ListExerciseDefinitionDto
{
    public required string Id { get; set; }
    public required string Title { get; set; }
    public List<string> History { get; set; } = [];
    public ExerciseModel? LastSession { get; set; }

    [Range(0, 100, ErrorMessage = "Value for {0} must be a percentage between {1} and {2}")]
    public double? LastImprovement { get; set; }
}