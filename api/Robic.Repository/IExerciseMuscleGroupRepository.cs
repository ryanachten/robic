using Robic.Repository.Models;
using Robic.Repository.Models.Enums;

namespace Robic.Repository;

public interface IExerciseMuscleGroupRepository
{
    Task AddDefinitionMuscleGroups(int definitionId, IEnumerable<MuscleGroup> primaryMuscleGroups);
    Task<IEnumerable<MuscleGroup>> GetDefinitionMuscleGroups(int definitionId);
    Task DeleteDefinitionMuscleGroups(int definitionId);
    Task<IEnumerable<AnalyticsItem>> GetMuscleGroupFrequencies(int userId);
}