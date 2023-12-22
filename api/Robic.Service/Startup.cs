using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Protocols.Configuration;
using Microsoft.IdentityModel.Tokens;
using MySqlConnector;
using Robic.Service.Data;
using Robic.Service.Helpers;
using Robic.Service.StartupExtensions;
using System;
using System.Reflection;
using System.Text;
using System.Text.Json.Serialization;

namespace Robic.Service;

public class Startup(IConfiguration configuration)
{
    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
        var tokenKey = Environment.GetEnvironmentVariable("TokenKey") ?? throw new InvalidConfigurationException("Missing token key");
        var connectionString = Environment.GetEnvironmentVariable("MySQLConnectionString") ?? throw new InvalidConfigurationException("Missing connection string");

        services.AddCors();
        services.AddMySqlDataSource(connectionString);

        services.AddSingleton(AutoMapperProfile.CreateMapper());
        services.AddRepositories();

        // TODO: Remove MongoDB repositories
        services.AddScoped(typeof(IMongoRepository<>), typeof(MongoRepository<>));
        services.AddScoped<IExerciseRepository, ExerciseRepository>();
        services.AddScoped<IExerciseDefinitionRepository, ExerciseDefinitionRepository>();
        services.AddScoped<IUnitOfWork, UnitOfWork>();

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
            opts.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()
        ));
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }

        app.UseHttpsRedirection();

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
