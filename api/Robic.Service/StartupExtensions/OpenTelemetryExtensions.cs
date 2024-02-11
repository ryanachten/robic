using Microsoft.Extensions.DependencyInjection;
using OpenTelemetry.Metrics;
using OpenTelemetry.Resources;
using System;
using System.Reflection;

namespace Robic.Service.StartupExtensions;

public static class OpenTelemetryExtensions
{
    public static IServiceCollection AddOpenTelemetryMetrics(this IServiceCollection services)
    {
        var assemblyName = Assembly.GetEntryAssembly()?.GetName();
        services.AddOpenTelemetry()
            .ConfigureResource(resource => resource.AddService(
                serviceName: assemblyName?.Name ?? "Robic",
                serviceVersion: assemblyName?.Version?.ToString() ?? "1.0",
                serviceInstanceId: Environment.MachineName
            ))
            .WithMetrics(metrics => metrics.AddAspNetCoreInstrumentation()
                .AddRuntimeInstrumentation()
                .AddPrometheusExporter());

        return services;
    }
}
