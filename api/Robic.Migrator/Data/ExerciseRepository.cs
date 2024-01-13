using Robic.Migrator.Models;

namespace Robic.Migrator.Data;

public class ExerciseRepository(
    IMongoRepository<Exercise> exerciseContext
) : IExerciseRepository
{
    public Task<IEnumerable<Exercise>> GetDefinitionExercises(string definitionId)
    {
        // Filter exercises to only those  associated with the user's definitions
        return exerciseContext.FilterByAsync(exercise => exercise.Definition == definitionId);
    }

    public async Task<Exercise> GetExerciseById(string id)
    {
        return await exerciseContext.FindByIdAsync(id);
    }
}