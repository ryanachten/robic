using Robic.Repository.Models;

namespace Robic.Repository;

public interface IExerciseSetRepository
{
    Task CreateSet(IEnumerable<ExerciseSet> set);
    Task<IEnumerable<ExerciseSet>> GetExerciseSets(int exerciseId);
    Task<IEnumerable<ExerciseSet>> GetExerciseSets(IEnumerable<int> exerciseIds);

}