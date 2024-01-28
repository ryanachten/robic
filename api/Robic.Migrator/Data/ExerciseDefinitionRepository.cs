using Robic.Migrator.Models;

namespace Robic.Migrator.Data;

public class ExerciseDefinitionRepository(
    IMongoRepository<ExerciseDefinition> exerciseDefinitionContext
) : IExerciseDefinitionRepository
{
    public async Task<ExerciseDefinition> GetExerciseDefinition(string id)
    {
        return await exerciseDefinitionContext.FindByIdAsync(id);
    }

    public Task<IEnumerable<ExerciseDefinition>> GetUserDefinitions(string userId)
    {
        return exerciseDefinitionContext.FilterByAsync(definition => definition.User == userId);
    }
}