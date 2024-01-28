using Robic.Repository.Models;
using Robic.Repository.Models.DTOs.User;

namespace Robic.Repository;

public interface IUserRepository
{
    Task<int> CreateUser(RegisterUserDto registerUser);
    Task<User?> GetUserByEmail(string email);
    Task<User?> GetUserById(int userId);
    Task DeleteUserById(int userId);
}