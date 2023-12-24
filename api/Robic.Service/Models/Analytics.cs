using System.Collections.Generic;

namespace Robic.Service.Models;

public class Analytics
{
    public AnalyticsItem? MostFrequentMuscleGroup { get; set; }
    public AnalyticsItem? MostFrequentExercise { get; set; }
    public AnalyticsItem? MostExerciseProgress { get; set; }
    public List<AnalyticsItem> MuscleGroupFrequency { get; set; } = [];
    public List<AnalyticsItem> ExerciseFrequency { get; set; } = [];
    public List<AnalyticsItem> ExerciseProgress { get; set; } = [];
}