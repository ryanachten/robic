using Robic.Migrator.Data;

namespace Robic.Migrator.Services;

public class MigrationService(IUserRepository userRepository) : IMigrationService
{
    public async Task MigrateUserResources(string userId)
    {
        var user = await userRepository.GetUser(userId);
    }
}
