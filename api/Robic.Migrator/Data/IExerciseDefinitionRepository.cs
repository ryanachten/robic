using Robic.Migrator.Models;

namespace Robic.Migrator.Data;

public interface IExerciseDefinitionRepository
{
    Task<IEnumerable<ExerciseDefinition>> GetUserDefinitions(string userId);
    Task<ExerciseDefinition> GetExerciseDefinition(string id);
}