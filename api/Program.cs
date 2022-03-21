using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace RobicServer
{
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
}
