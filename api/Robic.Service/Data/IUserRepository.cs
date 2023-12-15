using Robic.Service.Models;
using System.Threading.Tasks;

namespace Robic.Service.Data;

public interface IUserRepository
{
    Task<User> GetUser(string id);
    Task DeleteUser(User user);
}