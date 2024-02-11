using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Protocols.Configuration;
using MySqlConnector;
using Robic.Service.Helpers;
using Robic.Service.StartupExtensions;
using System;
using System.Reflection;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Robic.Service;

public class Startup(IConfiguration configuration)
{
    public void ConfigureServices(IServiceCollection services)
    {
        var connectionString = Environment.GetEnvironmentVariable("MySQLConnectionString") ?? throw new InvalidConfigurationException("Missing connection string");

        services.AddCors();
        services.AddMySqlDataSource(connectionString);

        services.AddOpenTelemetryMetrics();

        services.AddSingleton(AutoMapperProfile.CreateMapper());

        services.AddRepositories();

        services.AddJwtAuthentication();

        services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(Assembly.GetExecutingAssembly()));

        services.AddControllers().AddJsonOptions(opts =>
            opts.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter(JsonNamingPolicy.SnakeCaseLower)
        ));

        services.AddSwagger();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
            app.UseSwagger();
            app.UseSwaggerUI(x =>
            {
                x.SwaggerEndpoint("/swagger/v1/swagger.yaml", "Robic API");
            });
        }

        app.UseRouting();

        app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

        app.UseAuthentication();
        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapPrometheusScrapingEndpoint();
            endpoints.MapControllers();
        });
    }
}
