using RobicServer.Models;
using System.Linq;

namespace RobicServer.Helpers;

public class ExerciseUtilities(IQueryable<Exercise> exercises)
{
    public static double GetNetExerciseValue(Exercise exercise)
    {
        double total = 0.0;
        foreach (Set set in exercise.Sets)
        {
            if (set.Reps.HasValue && set.Value.HasValue)
                total += (double)set.Reps * (double)set.Value;
        }
        return total;
    }
}