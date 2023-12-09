namespace Robic.Service.Data;

public interface IUnitOfWork
{
    IAnalyticsRepository AnalyticsRepo { get; }
    IExerciseRepository ExerciseRepo { get; }
    IExerciseDefinitionRepository ExerciseDefinitionRepo { get; }
}