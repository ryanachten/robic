using System.Collections.Generic;
using System.Threading.Tasks;
using RobicServer.Models;

namespace RobicServer.Data
{
    public interface IExerciseRepository
    {
        Task<IEnumerable<Exercise>> GetDefinitionExercises(string definitionId);
        Task<Exercise> GetExerciseById(string id);
        Task<Exercise> CreateExercise(Exercise exercise, ExerciseDefinition definiton);
        Task<Exercise> UpdateExercise(Exercise exercise);
        Task DeleteExercise(string id, ExerciseDefinition definiton);
        Task<PersonalBest> GetPersonalBest(string defintionId);
    }
}