using Robic.Service.Models.Deprecated;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Robic.Service.Data;

public interface IExerciseDefinitionRepository
{
    Task<IEnumerable<MongoExerciseDefinition>> GetUserDefinitions(string userId);
    Task<MongoExerciseDefinition> GetExerciseDefinition(string id);
    Task<MongoExerciseDefinition> CreateDefinition(string userId, MongoExerciseDefinition definition);
    Task<MongoExerciseDefinition> UpdateDefinition(MongoExerciseDefinition existingDefinition, MongoExerciseDefinition updatedDefinition);
    Task DeleteDefinition(MongoExerciseDefinition definition);
}