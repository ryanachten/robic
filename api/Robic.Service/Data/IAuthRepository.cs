using Robic.Service.Models;
using System.Threading.Tasks;

namespace Robic.Service.Data;

public interface IAuthRepository
{
    Task<User> Register(User user, string password);
    Task<User?> Login(string username, string password);
    Task<bool> UserExists(string username);
}