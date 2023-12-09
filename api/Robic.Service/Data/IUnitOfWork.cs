namespace Robic.Service.Data;

public interface IUnitOfWork
{
    IAnalyticsRepository AnalyticsRepo { get; }
    IAuthRepository AuthRepo { get; }
    IExerciseRepository ExerciseRepo { get; }
    IExerciseDefinitionRepository ExerciseDefinitionRepo { get; }
}