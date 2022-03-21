using System.Collections.Generic;

namespace RobicServer.Models
{
    public class PersonalBest
    {
        public Exercise TopNetExercise { get; set; }
        public double TopAvgValue { get; set; }
        public int TopReps { get; set; }
        public int TopSets { get; set; }
        public List<PersonalBestHistory> History { get; set; }
    }
}