using Microsoft.Extensions.Logging;
using Robic.Repository;
using Robic.Repository.Models;
using Robic.Repository.Models.DTOs.Exercise;
using Robic.Repository.Models.Enums;
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
        var mongoDefinitions = await mongoExerciseDefinitionRepository.GetUserDefinitions(mongoDbUserId);

        foreach (var mongoDefinition in mongoDefinitions)
        {
            logger.LogInformation("Migrating definition: {Title}", mongoDefinition.Title);
            var definition = await CreateDefinition(mySqlUserId, mongoDefinition);
            if (definition == null) continue;

            var mongoExercises = await mongoExerciseRepository.GetDefinitionExercises(mongoDefinition.Id);
            await CreateExercises(mySqlUserId, definition.Id, mongoExercises);
        }
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
        logger.LogInformation("> Creating {Count} exercises", mongoExercises.Count());
        foreach (var mongoExercise in mongoExercises)
        {
            var exercise = await exerciseRepository.CreateExercise(new Exercise()
            {
                DefinitionId = definitionId,
                UserId = mySqlUserId,
                Date = mongoExercise.Date,
                TimeTaken = mongoExercise.TimeTaken,
            });

            var sets = mongoExercise.Sets.Where(s => s.Reps != null && s.Value != null).Select(s => new CreateExerciseSetDto()
            {
                Reps = (int)s.Reps!,
                Value = (int)s.Value!
            });

            logger.LogInformation("> Creating {Count} sets", sets.Count());
            await exerciseSetRepository.CreateSet(exercise.Id, definitionId, sets);
        }
    }
}
