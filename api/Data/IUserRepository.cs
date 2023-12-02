using RobicServer.Models;
using System.Threading.Tasks;

namespace RobicServer.Data;

public interface IUserRepository
{
    Task<User> GetUser(string id);
    Task DeleteUser(User user);
}