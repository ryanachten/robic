using Robic.Service.Helpers;
using Robic.Service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Robic.Service.Data;

public class ExerciseRepository(
    IMongoRepository<Exercise> exerciseContext,
    IMongoRepository<ExerciseDefinition> exerciseDefinitionContext
) : IExerciseRepository
{
    public async Task<Exercise> CreateExercise(Exercise exercise, ExerciseDefinition definition)
    {
        exercise.Date = DateTime.Now;

        await exerciseContext.InsertOneAsync(exercise);

        var latestExerciseId = definition.History.LastOrDefault();
        var latestExercise = latestExerciseId == null ? null : await exerciseContext.FindByIdAsync(latestExerciseId);

        // Add exercise to definition history
        definition.History.Add(exercise.Id);

        // Update definition aggregate fields
        definition.LastSession = exercise;
        if (latestExercise != null)
            definition.LastImprovement = GetLatestExerciseImprovement(exercise, latestExercise);

        await exerciseDefinitionContext.ReplaceOneAsync(definition);

        return exercise;
    }

    public async Task DeleteExercise(string id, ExerciseDefinition definition)
    {
        await exerciseContext.DeleteByIdAsync(id);

        definition.History.Remove(id);
        await exerciseDefinitionContext.ReplaceOneAsync(definition);
    }

    public Task<IEnumerable<Exercise>> GetDefinitionExercises(string definitionId)
    {
        // Filter exercises to only those  associated with the user's definitions
        return exerciseContext.FilterByAsync(exercise => exercise.Definition == definitionId);
    }

    public async Task<Exercise> GetExerciseById(string id)
    {
        return await exerciseContext.FindByIdAsync(id);
    }

    public async Task<PersonalBest?> GetPersonalBest(string definitionId)
    {
        var exercises = await GetDefinitionExercises(definitionId);
        if (exercises == null || !exercises.Any()) return null;

        Exercise? exerciseWithHighestNetValue = null;
        var highestAvgValue = 0.0;
        var highestReps = 0;
        var highestSets = 0;
        var history = new List<PersonalBestHistory>();

        foreach (var e in exercises)
        {
            if (e.NetValue.HasValue && (exerciseWithHighestNetValue == null || exerciseWithHighestNetValue.NetValue < e.NetValue))
                exerciseWithHighestNetValue = e;

            if (e.Sets.Count > highestSets)
                highestSets = e.Sets.Count;

            var totalValue = 0.0;
            foreach (var s in e.Sets)
            {
                if (s.Reps.HasValue && s.Reps > highestReps)
                {
                    highestReps = s.Reps ?? 0;
                }

                if (s.Value.HasValue)
                {
                    totalValue += (int)s.Value;
                }
            }
            var avgValue = totalValue / e.Sets.Count;
            if (avgValue > highestAvgValue)
                highestAvgValue = avgValue;

            if (e.Sets.Count > 0)
                history.Add(GetPersonalBestHistory(e));
        }

        return new PersonalBest
        {
            TopNetExercise = exerciseWithHighestNetValue,
            TopAvgValue = highestAvgValue,
            TopSets = highestSets,
            TopReps = highestReps,
            History = history
        };
    }

    public async Task<Exercise> UpdateExercise(Exercise exercise)
    {
        await exerciseContext.ReplaceOneAsync(exercise);
        return exercise;
    }

    private static PersonalBestHistory GetPersonalBestHistory(Exercise exercise)
    {
        var totalReps = 0.0;
        var totalValue = 0.0;
        foreach (var s in exercise.Sets)
        {
            if (s.Reps.HasValue)
            {
                totalReps += (double)s.Reps;
            }
            if (s.Value.HasValue)
            {
                totalValue += (double)s.Value;
            }
        }

        var record = new PersonalBestHistory()
        {
            Date = exercise.Date,
            NetValue = exercise.NetValue,
            Sets = exercise.Sets.Count,
            TimeTaken = exercise.TimeTaken,
            AvgReps = totalReps / exercise.Sets.Count,
            AvgValue = totalValue / exercise.Sets.Count,
        };

        return record;
    }

    private static double GetLatestExerciseImprovement(Exercise newExercise, Exercise lastExercise)
    {
        var newNetValue = ExerciseUtilities.GetNetExerciseValue(newExercise);
        var lastNetValue = ExerciseUtilities.GetNetExerciseValue(lastExercise);

        var min = Math.Min(newNetValue, lastNetValue);
        var max = Math.Max(newNetValue, lastNetValue);
        var delta = max - min;

        // Get a percentage of deviation based on average net value
        var improvement = (delta / max) * 100;

        // If most recent value is less than average, this is a negative correlation
        if (lastNetValue > newNetValue)
            improvement *= -1;

        return Math.Round(improvement);
    }
}