using System.CommandLine;

namespace Robic.Migrator;

internal class Program
{
    private static async Task Main(string[] args)
    {
        var userIdCommand = new Option<string>(name: "--userId", description: "User ID of the MongoDB user we want to migrate");
        var rootCommand = new RootCommand("Migrate Robic resources from MongoDB to MySQL");
        rootCommand.AddOption(userIdCommand);

        rootCommand.SetHandler((userId) =>
        {
            Console.WriteLine($"UserId: {userId}");
        }, userIdCommand);

        await rootCommand.InvokeAsync(args);
    }
}