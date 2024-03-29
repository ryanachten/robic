using System;

namespace Robic.Service.Models;

public class ExerciseHistoryItem
{
    public DateTime Date { get; set; }
    public double NetValue { get; set; }
    public double AvgValue { get; set; }
    public double AvgReps { get; set; }
    public int Sets { get; set; }
    public DateTime TimeTaken { get; set; }
}