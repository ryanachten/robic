using System.Collections.Generic;
using System.Linq;
using RobicServer.Models;

namespace RobicServer.Helpers
{
    public class ExerciseUtilities
    {
        private readonly IQueryable<Exercise> _exercises;

        public ExerciseUtilities(IQueryable<Exercise> exercises)
        {
            _exercises = exercises;
        }

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
}