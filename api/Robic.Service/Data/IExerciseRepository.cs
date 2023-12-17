using Robic.Service.Models;
using Robic.Service.Models.Deprecated;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Robic.Service.Data;

public interface IExerciseRepository
{
    Task<IEnumerable<MongoExercise>> GetDefinitionExercises(string definitionId);
    Task<MongoExercise> GetExerciseById(string id);
    Task<MongoExercise> CreateExercise(MongoExercise exercise, MongoExerciseDefinition definition);
    Task<MongoExercise> UpdateExercise(MongoExercise exercise);
    Task DeleteExercise(string id, MongoExerciseDefinition definition);
    Task<PersonalBest?> GetPersonalBest(string definitionId);
}