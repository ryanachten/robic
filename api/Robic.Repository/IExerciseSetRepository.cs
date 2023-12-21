using Robic.Repository.Models;
using Robic.Repository.Models.DTOs.Exercise;

namespace Robic.Repository;

public interface IExerciseSetRepository
{
    Task CreateSet(int exerciseId, IEnumerable<CreateExerciseSetDto> sets);
    Task<IEnumerable<ExerciseSet>> GetExerciseSets(int exerciseId);
    Task<IEnumerable<ExerciseSet>> GetExerciseSets(IEnumerable<int> exerciseIds);
    Task DeleteExerciseSets(int exerciseId);
}