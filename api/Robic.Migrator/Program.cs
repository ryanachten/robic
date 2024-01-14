using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using MySqlConnector;
using Robic.Migrator.Services;
using Robic.Repository;
using System.CommandLine;
using System.CommandLine.Parsing;
using Mongo = Robic.Migrator.Data;

namespace Robic.Migrator;

internal static class Program
{
    private static async Task Main(string[] args)
    {
        var (mongoDbUserId, mySqlUserId) = await GetUserIdArgument(args);

        var builder = CreateHostBuilder(args);
        using var host = builder.Build();

        var migrationService = host.Services.GetService<IMigrationService>() ?? throw new TypeAccessException("Could retrieve migration service");
        await migrationService.MigrateUserResources(mongoDbUserId, mySqlUserId);
    }

    private static HostApplicationBuilder CreateHostBuilder(string[] args)
    {
        HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);

        var connectionString = Environment.GetEnvironmentVariable("MySQLConnectionString") ?? throw new CommandLineConfigurationException("Missing MySQL connection string");
        builder.Services.AddMySqlDataSource(connectionString);

        builder.Services.AddScoped(typeof(Mongo.IMongoRepository<>), typeof(Mongo.MongoRepository<>));
        builder.Services.AddScoped<Mongo.IExerciseDefinitionRepository, Mongo.ExerciseDefinitionRepository>();
        builder.Services.AddScoped<Mongo.IExerciseRepository, Mongo.ExerciseRepository>();
        builder.Services.AddScoped<Mongo.IUserRepository, Mongo.UserRepository>();

        builder.Services.AddScoped<IExerciseDefinitionRepository, ExerciseDefinitionRepository>();
        builder.Services.AddScoped<IExerciseRepository, ExerciseRepository>();
        builder.Services.AddScoped<IExerciseSetRepository, ExerciseSetRepository>();
        builder.Services.AddScoped<IExerciseMuscleGroupRepository, ExerciseMuscleGroupRepository>();

        builder.Services.AddScoped<IMigrationService, MigrationService>();

        return builder;
    }

    private static async Task<(string, int)> GetUserIdArgument(string[] args)
    {
        var mongoDbUserIdCommand = new Option<string>(name: "--mongoDbUserId", description: "User ID of the MongoDB user we want to migrate from");
        var mySqlUserIdCommand = new Option<int>(name: "--mysqlUserId", description: "User ID of the MySQL user we want to migrate to");

        var rootCommand = new RootCommand("Migrate Robic resources from MongoDB to MySQL");
        rootCommand.AddOption(mongoDbUserIdCommand);
        rootCommand.AddOption(mySqlUserIdCommand);

        string? mongoDbUserId = null;
        int? mySqlUserId = null;

        rootCommand.SetHandler((mongoDBUserIdResult, mySqlUserIdResult) =>
        {
            mongoDbUserId = mongoDBUserIdResult;
            mySqlUserId = mySqlUserIdResult;
        }, mongoDbUserIdCommand, mySqlUserIdCommand);

        await rootCommand.InvokeAsync(args);

        if (mongoDbUserId == null) throw new CommandLineConfigurationException($"{nameof(mongoDbUserId)} not set in command line");
        if (mySqlUserId == null) throw new CommandLineConfigurationException($"{nameof(mySqlUserId)} not set in command line");

        return (mongoDbUserId, (int)mySqlUserId);
    }
}