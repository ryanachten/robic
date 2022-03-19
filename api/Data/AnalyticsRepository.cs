using System;
using System.Collections.Generic;
using System.Linq;
using RobicServer.Helpers;
using RobicServer.Models;

namespace RobicServer.Data
{
    public class AnalyticsRepository : IAnalyticsRepository
    {
        struct ExerciseProgressValue
        {
            public string Id { get; set; }
            public string Title { get; set; }
            public double Total { get; set; }
            public int NumberOfSessions { get; set; }
        };

        private readonly IMongoRepository<Exercise> _exerciseRepo;
        private readonly IMongoRepository<ExerciseDefinition> _exerciseDefinitionRepo;
        private List<ExerciseDefinition> _userExerciseDefinitions;
        private List<Exercise> _userExercises;

        public AnalyticsRepository(
            IMongoRepository<Exercise> exerciseRepo,
            IMongoRepository<ExerciseDefinition> exerciseDefinitionRepo
        )
        {
            _exerciseRepo = exerciseRepo;
            _exerciseDefinitionRepo = exerciseDefinitionRepo;
        }
        public Analytics GetUserAnalytics(string userId)
        {
            GetUserExercises(userId);
            List<AnalyticsItem> muscleGroupFrequency = this.GetMuscleGroupFrequency();
            List<AnalyticsItem> exerciseFrequency = this.GetExerciseFrequency();

            return new Analytics()
            {
                ExerciseFrequency = exerciseFrequency,
                MostFrequentExercise = exerciseFrequency.FirstOrDefault(),
                ExerciseProgress = this.GetExerciseProgress(),
                MuscleGroupFrequency = muscleGroupFrequency,
                MostFrequentMuscleGroup = muscleGroupFrequency.FirstOrDefault(),
            };
        }

        private List<AnalyticsItem> GetExerciseProgress()
        {
            List<AnalyticsItem> exerciseProgress = _userExercises.GroupBy(e => e.Definition).Select(g =>
            {
                ExerciseDefinition def = _userExerciseDefinitions.FirstOrDefault(d => d.Id == g.First().Definition);
                Exercise firstExercise = _userExercises.FirstOrDefault(ex => ex.Id == def.History?.FirstOrDefault());

                var total = g.Sum(t => (double)t.NetValue);
                var numberOfSessions = g.Count();

                double progressPercent = 0.0;
                if (firstExercise != null)
                {
                    double initialNetValue = ExerciseUtilities.GetNetExerciseValue(firstExercise);

                    // Progress percent = average net value - initial net value
                    progressPercent = (total / numberOfSessions) - initialNetValue;
                }
                return new AnalyticsItem
                {
                    Marker = def.Title,
                    Count = progressPercent,
                };
            }).OrderByDescending(a => a.Count).ToList();

            return exerciseProgress;
        }

        private List<AnalyticsItem> GetExerciseFrequency()
        {
            // Increment muscle group by occurance
            List<AnalyticsItem> exerciseFrequency = _userExerciseDefinitions.Select(
                (def) =>
                {
                    return new AnalyticsItem
                    {
                        Marker = def.Title,
                        Count = def.History.Count
                    };
                }
            ).OrderByDescending(a => a.Count).ToList();
            return exerciseFrequency;
        }

        private List<AnalyticsItem> GetMuscleGroupFrequency()
        {
            // Increment muscle group by occurance
            Dictionary<string, int> muscleGroupFrequency = new Dictionary<string, int>();
            _userExercises.GroupBy(e => e.Definition).ToList().ForEach(g =>
            {
                ExerciseDefinition exerciseDefiniton = _userExerciseDefinitions.FirstOrDefault(def => def.Id == g.First().Definition);
                exerciseDefiniton.PrimaryMuscleGroup.ForEach(m =>
                 {
                     if (muscleGroupFrequency.ContainsKey(m))
                     {
                         muscleGroupFrequency[m] += g.Count();
                     }
                     else
                     {
                         muscleGroupFrequency.Add(m, g.Count());
                     }
                 });
            });

            // Convert dictionary to analytics list
            List<AnalyticsItem> muscleGroupFrequencyList = new List<AnalyticsItem>();
            foreach (KeyValuePair<string, int> muscleGroup in muscleGroupFrequency)
            {
                muscleGroupFrequencyList.Add(new AnalyticsItem()
                {
                    Marker = muscleGroup.Key,
                    Count = muscleGroup.Value
                });
            }
            muscleGroupFrequencyList.Sort((a, b) => a.Count < b.Count ? 1 : -1);
            return muscleGroupFrequencyList;
        }

        // Gets exercises and exercise definitions based on user ID in claimss
        private void GetUserExercises(string userId)
        {
            _userExerciseDefinitions = _exerciseDefinitionRepo.FilterBy(e => e.User == userId).ToList();

            var exericseIds = _userExerciseDefinitions.Select(e => e.Id);
            _userExercises = _exerciseRepo.FilterBy(e => exericseIds.Contains(e.Definition)).ToList();
        }
    }
}