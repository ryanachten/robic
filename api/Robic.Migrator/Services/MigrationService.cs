using Microsoft.Extensions.Logging;
using Robic.Repository;
using Robic.Repository.Models;
using Robic.Repository.Models.DTOs.Exercise;
using Robic.Repository.Models.Enums;
using System.Diagnostics;
using Mongo = Robic.Migrator.Models;
using MongoRepository = Robic.Migrator.Data;

namespace Robic.Migrator.Services;

public class MigrationService(
    ILogger<MigrationService> logger,
    MongoRepository.IExerciseDefinitionRepository mongoExerciseDefinitionRepository,
    MongoRepository.IExerciseRepository mongoExerciseRepository,
    IExerciseDefinitionRepository exerciseDefinitionRepository,
    IExerciseRepository exerciseRepository,
    IExerciseSetRepository exerciseSetRepository,
    IExerciseMuscleGroupRepository exerciseMuscleGroupRepository
) : IMigrationService
{
    public async Task MigrateUserResources(string mongoDbUserId, int mySqlUserId)
    {
        var stopwatch = new Stopwatch();
        stopwatch.Start();
        logger.LogInformation("Starting migration");

        var mongoDefinitions = await mongoExerciseDefinitionRepository.GetUserDefinitions(mongoDbUserId);

        for (int i = 0; i < mongoDefinitions.Count(); i++)
        {
            var mongoDefinition = mongoDefinitions.ElementAt(i);

            logger.LogInformation("({i}/{Count}) Migrating definition: {Title}", i + 1, mongoDefinitions.Count(), mongoDefinition.Title);
            var definition = await CreateDefinition(mySqlUserId, mongoDefinition);
            if (definition == null) continue;

            var mongoExercises = await mongoExerciseRepository.GetDefinitionExercises(mongoDefinition.Id);
            await CreateExercises(mySqlUserId, definition.Id, mongoExercises);
        }

        stopwatch.Stop();
        logger.LogInformation("Completed migration in {ElapsedMilliseconds}ms", stopwatch.ElapsedMilliseconds);
    }

    private async Task<ExerciseDefinition?> CreateDefinition(int mySqlUserId, Mongo.ExerciseDefinition mongoDefinition)
    {
        logger.LogInformation("> Creating exercise definition: {Title}", mongoDefinition.Title);
        var hasValidUnit = Enum.TryParse(mongoDefinition.Unit, true, out Unit unit);
        if (!hasValidUnit)
        {
            logger.LogError("> Exercise definition {Title} has invalid unit {Unit}. Aborting migration of this record.", mongoDefinition.Title, mongoDefinition.Unit);
            return null;
        }

        var definition = await exerciseDefinitionRepository.CreateDefinition(new ExerciseDefinition()
        {
            Title = mongoDefinition.Title,
            Unit = unit,
            UserId = mySqlUserId
        });

        var muscleGroups = new List<MuscleGroup>();
        foreach (var mongoMuscleGroup in mongoDefinition.PrimaryMuscleGroup)
        {
            if (Enum.TryParse(mongoMuscleGroup, true, out MuscleGroup muscleGroup))
            {
                muscleGroups.Add(muscleGroup);
            }
        }

        if (muscleGroups.Count > 0)
        {
            logger.LogInformation("> Creating {Count} muscle groups for definition {Title}", muscleGroups.Count, mongoDefinition.Title);
            await exerciseMuscleGroupRepository.AddDefinitionMuscleGroups(
                definition.Id,
                muscleGroups
            );
        }

        return definition;
    }

    private async Task CreateExercises(int mySqlUserId, int definitionId, IEnumerable<Mongo.Exercise> mongoExercises)
    {
        var exerciseTasks = new List<Task>();
        foreach (var mongoExercise in mongoExercises)
        {

            exerciseTasks.Add(CreateExercise(mySqlUserId, definitionId, mongoExercise));
        }

        await Task.WhenAll(exerciseTasks);

        logger.LogInformation("> Creating {Count} exercises for {MongoCount} Mongo exercises", exerciseTasks.Count, mongoExercises.Count());

    }

    private async Task CreateExercise(int mySqlUserId, int definitionId, Mongo.Exercise mongoExercise)
    {
        logger.LogInformation("> Creating exercise for Mongo exercise {Id}", mongoExercise.Id);

        var exercise = await exerciseRepository.CreateExercise(new Exercise()
        {
            DefinitionId = definitionId,
            UserId = mySqlUserId,
            Date = mongoExercise.Date,
            TimeTaken = mongoExercise.TimeTaken,
        });

        var sets = mongoExercise.Sets.Where(s => s.Reps != null && s.Value != null).Select(s => new CreateExerciseSetDto()
        {
            Reps = s.Reps ?? 0,
            Value = s.Value ?? 0.0
        });

        logger.LogInformation("> Creating {Count} sets for exercise {Id}", sets.Count(), exercise.Id);

        await exerciseSetRepository.CreateSet(exercise.Id, definitionId, sets);
    }
}
