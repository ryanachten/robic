using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Robic.Migrator.Data;
using Robic.Migrator.Services;
using System.CommandLine;
using System.CommandLine.Parsing;

namespace Robic.Migrator;

internal static class Program
{
    private static async Task Main(string[] args)
    {
        var userId = await GetUserIdArgument(args) ?? throw new CommandLineConfigurationException("User ID argument not defined");
        var builder = CreateHostBuilder(args);
        using var host = builder.Build();

        var migrationService = host.Services.GetService<IMigrationService>() ?? throw new TypeAccessException("Could retrieve migration service");
        await migrationService.MigrateUserResources(userId);
    }

    private static HostApplicationBuilder CreateHostBuilder(string[] args)
    {
        HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);

        builder.Services.AddScoped(typeof(IMongoRepository<>), typeof(MongoRepository<>));
        builder.Services.AddScoped<IExerciseDefinitionRepository, ExerciseDefinitionRepository>();
        builder.Services.AddScoped<IUserRepository, UserRepository>();
        builder.Services.AddScoped<IMigrationService, MigrationService>();

        return builder;
    }

    private static async Task<string?> GetUserIdArgument(string[] args)
    {
        var userIdCommand = new Option<string>(name: "--userId", description: "User ID of the MongoDB user we want to migrate");
        var rootCommand = new RootCommand("Migrate Robic resources from MongoDB to MySQL");
        rootCommand.AddOption(userIdCommand);

        string? userId = null;
        rootCommand.SetHandler((userIdResult) =>
        {
            userId = userIdResult;
        }, userIdCommand);

        await rootCommand.InvokeAsync(args);

        return userId;
    }
}