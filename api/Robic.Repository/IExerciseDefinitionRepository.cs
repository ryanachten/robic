using Robic.Repository.Models;
using Robic.Repository.Models.DTOs.ExerciseDefinition;
using Robic.Repository.Models.Enums;

namespace Robic.Repository;

public interface IExerciseDefinitionRepository
{
    Task<ExerciseDefinition?> GetDefinitionById(int exerciseDefinitionId);
    Task<ExerciseDefinition?> GetDefinitionByTitle(int userId, string title);
    Task<IEnumerable<ExerciseDefinitionSummary>> GetDefinitionSummaries(int userId, ExerciseDefinitionSortField sortField, SortDirection sortDirection);
    Task<ExerciseDefinition> CreateDefinition(ExerciseDefinition exerciseDefinition);
    Task UpdateDefinition(UpdateExerciseDefinitionDto createExerciseDefinition);
    Task DeleteDefinitionById(int exerciseDefinitionId);
    Task<IEnumerable<AnalyticsItem>> GetDefinitionFrequencies(int userId, int maxResults);
    Task<IEnumerable<AnalyticsItem>> GetDefinitionProgress(int userId, int maxResults);
}