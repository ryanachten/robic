using Robic.Migrator.Models;

namespace Robic.Migrator.Data;

public class UserRepository(
    IMongoRepository<User> userContext
) : IUserRepository
{
    public async Task<User> GetUser(string id)
    {
        return await userContext.FindByIdAsync(id);
    }
}