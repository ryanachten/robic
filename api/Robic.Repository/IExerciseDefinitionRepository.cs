using Robic.Repository.Models;
using Robic.Repository.Models.DTOs.ExerciseDefinition;

namespace Robic.Repository;

public interface IExerciseDefinitionRepository
{
    Task<ExerciseDefinition?> GetDefinitionById(int exerciseDefinitionId);
    Task<ExerciseDefinition?> GetDefinitionByTitle(int userId, string title);
    Task<IEnumerable<ExerciseDefinition>?> GetUserDefinitions(int userId);
    Task CreateDefinition(CreateExerciseDefinitionDto createExerciseDefinition);
    Task UpdateDefinition(UpdateExerciseDefinitionDto createExerciseDefinition);
    Task DeleteDefinitionById(int exerciseDefinitionId);

}