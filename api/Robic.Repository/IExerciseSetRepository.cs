using Robic.Repository.Models;
using Robic.Repository.Models.DTOs.Exercise;

namespace Robic.Repository;

public interface IExerciseSetRepository
{
    Task CreateSet(int exerciseId, int definitionId, IEnumerable<CreateExerciseSetDto> sets);
    Task<IEnumerable<ExerciseSet>> GetExerciseSets(int exerciseId);
    Task<IEnumerable<ExerciseSet>> GetExerciseSets(IEnumerable<int> exerciseIds);
    Task DeleteExerciseSets(int exerciseId);
    Task<IEnumerable<ExerciseSet>> GetPersonalBestExerciseSets(int definitionId);
    Task<PersonalBestMaxValues> GetPersonalBestMaxValues(int definitionId);
}