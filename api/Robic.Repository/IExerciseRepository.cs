using Robic.Repository.Models;

namespace Robic.Repository;

public interface IExerciseRepository
{
    Task<Exercise?> GetExerciseById(int id);
    Task<IEnumerable<Exercise>> GetDefinitionExercises(int userId, int definitionId);
    Task<Exercise> CreateExercise(Exercise exercise);
    Task UpdateExercise(int id, Exercise updatedExercise);
    Task DeleteExerciseById(int id);
}