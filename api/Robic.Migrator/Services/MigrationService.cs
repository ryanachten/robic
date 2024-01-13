using Robic.Migrator.Data;

namespace Robic.Migrator.Services;

public class MigrationService(
    IUserRepository userRepository,
    IExerciseDefinitionRepository exerciseDefinitionRepository,
    IExerciseRepository exerciseRepository
) : IMigrationService
{
    public async Task MigrateUserResources(string userId)
    {
        var user = await userRepository.GetUser(userId);
        var definitions = await exerciseDefinitionRepository.GetUserDefinitions(userId);

        foreach (var definition in definitions)
        {
            Console.WriteLine($"Getting exercises for definition: {definition.Title}");
            var exercises = await exerciseRepository.GetDefinitionExercises(definition.Id);
            Console.WriteLine($"Found {exercises.Count()} exercises");
        }
    }
}
