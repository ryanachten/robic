using Microsoft.Extensions.DependencyInjection;
using Robic.Repository;

namespace Robic.Service.StartupExtensions;

public static class RepositoryExtensions
{
    public static IServiceCollection AddRepositories(this IServiceCollection services)
    {
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IExerciseRepository, ExerciseRepository>();
        services.AddScoped<IExerciseDefinitionRepository, ExerciseDefinitionRepository>();
        services.AddScoped<IExerciseSetRepository, ExerciseSetRepository>();
        services.AddScoped<IExerciseMuscleGroupRepository, ExerciseMuscleGroupRepository>();

        return services;
    }
}
