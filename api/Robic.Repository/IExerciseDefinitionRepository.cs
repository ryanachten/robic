using Robic.Repository.Models;
using Robic.Repository.Models.DTOs.ExerciseDefinition;

namespace Robic.Repository;

public interface IExerciseDefinitionRepository
{
    Task CreateDefinition(CreateExerciseDefinitionDto createExerciseDefinition);
    Task<ExerciseDefinition?> GetDefinitionById(int exerciseDefinitionId);
    Task<ExerciseDefinition?> GetDefinitionByTitle(int userId, string title);
    Task<IEnumerable<ExerciseDefinition>?> GetUserDefinitions(int userId);
}