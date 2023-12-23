using Robic.Repository.Models;
using Robic.Repository.Models.DTOs.ExerciseDefinition;

namespace Robic.Repository;

public interface IExerciseDefinitionRepository
{
    Task<ExerciseDefinition?> GetDefinitionById(int exerciseDefinitionId);
    Task<ExerciseDefinition?> GetDefinitionByTitle(int userId, string title);
    Task<IEnumerable<ExerciseDefinitionSummary>> GetDefinitionSummaries(int userId);
    Task<ExerciseDefinition> CreateDefinition(ExerciseDefinition exerciseDefinition);
    Task UpdateDefinition(UpdateExerciseDefinitionDto createExerciseDefinition);
    Task DeleteDefinitionById(int exerciseDefinitionId);
}