using RobicServer.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RobicServer.Data;

public interface IExerciseRepository
{
    Task<IEnumerable<Exercise>> GetDefinitionExercises(string definitionId);
    Task<Exercise> GetExerciseById(string id);
    Task<Exercise> CreateExercise(Exercise exercise, ExerciseDefinition definition);
    Task<Exercise> UpdateExercise(Exercise exercise);
    Task DeleteExercise(string id, ExerciseDefinition definition);
    Task<PersonalBest?> GetPersonalBest(string definitionId);
}