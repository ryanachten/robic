using Robic.Service.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Robic.Service.Data;

public interface IExerciseDefinitionRepository
{
    Task<IEnumerable<ExerciseDefinition>> GetUserDefinitions(string userId);
    Task<ExerciseDefinition> GetExerciseDefinition(string id);
    Task<ExerciseDefinition> CreateDefinition(string userId, ExerciseDefinition definition);
    Task<ExerciseDefinition> UpdateDefinition(ExerciseDefinition existingDefinition, ExerciseDefinition updatedDefinition);
    Task DeleteDefinition(ExerciseDefinition definition);
}