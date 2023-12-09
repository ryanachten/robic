using Robic.Repository.Models;
using Robic.Repository.Models.DTOs.User;

namespace Robic.Repository;

public interface IUserRepository
{
    Task CreateUser(RegisterUserDto registerUser);
    Task<User?> GetUserByEmail(string email);
    Task<User?> GetUserById(string userId);
    Task DeleteUserById(string userId);
}