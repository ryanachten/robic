using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using System;

namespace Robic.Service;

public class Program
{
    public static void Main(string[] args)
    {
        CreateHostBuilder(args).Build().Run();
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
                var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
                if (env == "Development")
                {
                    webBuilder.UseStartup<Startup>();
                }
                else
                {
                    // In production, we want to use Heroku's PORT exposed via env variable
                    // and let Heroku handle HTTPS redirection (hence only use .NET HTTP in PROD)
                    var port = Environment.GetEnvironmentVariable("PORT");
                    webBuilder.UseStartup<Startup>().UseUrls("http://*:" + port);
                }
            });
}
