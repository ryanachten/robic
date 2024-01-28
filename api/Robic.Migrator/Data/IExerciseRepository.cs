using Robic.Migrator.Models;

namespace Robic.Migrator.Data;

public interface IExerciseRepository
{
    Task<IEnumerable<Exercise>> GetDefinitionExercises(string definitionId);
    Task<Exercise> GetExerciseById(string id);
}