using Robic.Service.Models;
using Robic.Service.Models.Deprecated;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Robic.Service.Data;

public interface IExerciseRepository
{
    Task<IEnumerable<Exercise>> GetDefinitionExercises(string definitionId);
    Task<Exercise> GetExerciseById(string id);
    Task<Exercise> CreateExercise(Exercise exercise, MongoExerciseDefinition definition);
    Task<Exercise> UpdateExercise(Exercise exercise);
    Task DeleteExercise(string id, MongoExerciseDefinition definition);
    Task<PersonalBest?> GetPersonalBest(string definitionId);
}