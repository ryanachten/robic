using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Robic.Service.Helpers;
using System;
using System.IO;
using System.Reflection;

namespace Robic.Service.StartupExtensions;

public static class SwaggerExtensions
{
    public static IServiceCollection AddSwagger(this IServiceCollection services)
    {
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

        return services;
    }
}
