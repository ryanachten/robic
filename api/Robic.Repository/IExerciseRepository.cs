using Robic.Repository.Models;
using Robic.Repository.Models.DTOs.Exercise;

namespace Robic.Repository;

public interface IExerciseRepository
{
    Task<Exercise?> GetExerciseById(int id);
    Task<IEnumerable<Exercise>> GetDefinitionExercises(int userId, int definitionId);
    Task<Exercise?> GetLatestDefinitionExercise(int definitionId);
    Task<Exercise> CreateExercise(Exercise exercise);
    Task UpdateExercise(int id, UpdateExerciseDto updatedExercise);
    Task DeleteExerciseById(int id);
}