using Robic.Migrator.Models;

namespace Robic.Migrator.Data;

public interface IUserRepository
{
    Task<User> GetUser(string id);
}