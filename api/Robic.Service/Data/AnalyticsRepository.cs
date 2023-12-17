using Robic.Service.Helpers;
using Robic.Service.Models;
using Robic.Service.Models.Deprecated;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Robic.Service.Data;

public class AnalyticsRepository : IAnalyticsRepository
{
    private readonly IMongoRepository<MongoExercise> _exerciseRepo;
    private readonly IMongoRepository<MongoExerciseDefinition> _exerciseDefinitionRepo;
    private List<MongoExerciseDefinition> _userExerciseDefinitions = [];
    private List<MongoExercise> _userExercises = [];

    public AnalyticsRepository(
        IMongoRepository<MongoExercise> exerciseRepo,
        IMongoRepository<MongoExerciseDefinition> exerciseDefinitionRepo
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
        var exerciseProgress = _userExercises.GroupBy(e => e.Definition).Select(g =>
        {
            var def = _userExerciseDefinitions.Find(d => d.Id == g.First().Definition);
            var firstExercise = _userExercises.Find(ex => ex.Id == def?.History?.FirstOrDefault());

            var total = g.Sum(t => t.NetValue) ?? 0.0;
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
                Marker = def?.Title ?? string.Empty,
                Count = progressPercent,
            };
        }).OrderByDescending(a => a.Count).ToList();

        return exerciseProgress;
    }

    private List<AnalyticsItem> GetExerciseFrequency()
    {
        return _userExerciseDefinitions.Select(
            (def) =>
            {
                return new AnalyticsItem
                {
                    Marker = def.Title,
                    Count = def.History.Count
                };
            }
        ).OrderByDescending(a => a.Count).ToList();
    }

    private List<AnalyticsItem> GetMuscleGroupFrequency()
    {
        // Increment muscle group by occurrence
        var muscleGroupFrequency = new Dictionary<string, int>();
        _userExercises.GroupBy(e => e.Definition).ToList().ForEach(g =>
        {
            var exerciseDefinition = _userExerciseDefinitions.Find(def => def.Id == g.First().Definition);
            exerciseDefinition?.PrimaryMuscleGroup.ForEach(m =>
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
        var muscleGroupFrequencyList = new List<AnalyticsItem>();
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

    // Gets exercises and exercise definitions based on user ID in claims
    private void GetUserExercises(string userId)
    {
        _userExerciseDefinitions = _exerciseDefinitionRepo.FilterBy(e => e.User == userId).ToList();

        var exerciseIds = _userExerciseDefinitions.Select(e => e.Id);
        _userExercises = _exerciseRepo.FilterBy(e => exerciseIds.Contains(e.Definition)).ToList();
    }
}