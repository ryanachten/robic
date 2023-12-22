namespace Robic.Repository;

public interface IExerciseMuscleGroupRepository
{
    Task AddDefinitionMuscleGroups(int definitionId, IEnumerable<string> primaryMuscleGroups);
    Task<IEnumerable<string>> GetDefinitionMuscleGroups(int definitionId);
    Task DeleteDefinitionMuscleGroups(int definitionId);
}