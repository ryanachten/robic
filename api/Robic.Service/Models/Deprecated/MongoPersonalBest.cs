using System;
using System.Collections.Generic;

namespace Robic.Service.Models.Deprecated;

[Obsolete("Use non-MongoDB class")]
public class MongoPersonalBest
{
    public MongoExercise? TopNetExercise { get; set; }
    public double TopAvgValue { get; set; }
    public int TopReps { get; set; }
    public int TopSets { get; set; }
    public List<ExerciseHistoryItem> History { get; set; } = [];
}