
namespace Robic.Migrator.Services
{
    public interface IMigrationService
    {
        Task MigrateUserResources(string userId);
    }
}