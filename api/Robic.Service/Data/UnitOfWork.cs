using Robic.Service.Models;
using Robic.Service.Models.Deprecated;

namespace Robic.Service.Data;

public class UnitOfWork(
    IMongoRepository<User> userContext,
    IMongoRepository<Exercise> exerciseContext,
    IMongoRepository<MongoExerciseDefinition> exerciseDefinitionContext
) : IUnitOfWork
{
    public IExerciseRepository ExerciseRepo => new ExerciseRepository(exerciseContext, exerciseDefinitionContext);

    public IExerciseDefinitionRepository ExerciseDefinitionRepo => new ExerciseDefinitionRepository(exerciseDefinitionContext, exerciseContext, userContext);

    public IAnalyticsRepository AnalyticsRepo => new AnalyticsRepository(exerciseContext, exerciseDefinitionContext);
}