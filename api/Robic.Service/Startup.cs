using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Protocols.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using MySqlConnector;
using OpenTelemetry.Metrics;
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;
using Robic.Service.Helpers;
using Robic.Service.StartupExtensions;
using System;
using System.IO;
using System.Reflection;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Robic.Service;

public class Startup(IConfiguration configuration)
{
    public void ConfigureServices(IServiceCollection services)
    {
        var tokenKey = Environment.GetEnvironmentVariable("TokenKey") ?? throw new InvalidConfigurationException("Missing token key");
        var connectionString = Environment.GetEnvironmentVariable("MySQLConnectionString") ?? throw new InvalidConfigurationException("Missing connection string");

        services.AddCors();
        services.AddMySqlDataSource(connectionString);

        // TODO: move into extension method and only enable in production
        var assemblyName = Assembly.GetEntryAssembly()?.GetName();
        services.AddOpenTelemetry()
            .ConfigureResource(resource => resource.AddService(
                serviceName: assemblyName?.Name ?? "Robic",
                serviceVersion: assemblyName?.Version?.ToString() ?? "1.0",
                serviceInstanceId: Environment.MachineName
            ))
            .WithTracing(tracing => tracing.AddAspNetCoreInstrumentation()
                .AddConsoleExporter()
                .AddOtlpExporter())
            .WithMetrics(metrics => metrics.AddAspNetCoreInstrumentation()
                .AddRuntimeInstrumentation()
                .AddConsoleExporter()
                .AddOtlpExporter());

        services.AddSingleton(AutoMapperProfile.CreateMapper());
        services.AddRepositories();

        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(tokenKey)),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(Assembly.GetExecutingAssembly()));
        services.AddControllers().AddJsonOptions(opts =>
            opts.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter(JsonNamingPolicy.SnakeCaseLower)
        ));
        services.AddSwaggerGen(options =>
        {
            options.SwaggerDoc("v1", new OpenApiInfo
            {
                Version = "v1",
                Title = "Robic",
                Description = "Simple exercise tracking and analysis API",
            });

            options.SchemaFilter<RequireNonNullablePropertiesSchemaFilter>();
            options.SupportNonNullableReferenceTypes();

            var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
            options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));
        });
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

        // TODO: breaks local development for Android. Ensure this works in production and remove associated redirect code
        //app.UseHttpsRedirection();

        app.UseRouting();

        app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

        app.UseAuthentication();
        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });
    }
}
