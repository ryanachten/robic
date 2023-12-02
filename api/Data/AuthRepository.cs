using RobicServer.Models;
using System.Threading.Tasks;

namespace RobicServer.Data;

public class AuthRepository(IMongoRepository<User> userRepo) : IAuthRepository
{
    public async Task<User> Login(string email, string password)
    {
        var user = await userRepo.FindOneAsync(user => user.Email == email);
        if (user == null)
            return null;

        if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
            return null;

        return user;
    }

    public async Task<User> Register(User user, string password)
    {
        byte[] passwordHash, passwordSalt;
        CreatePasswordHash(password, out passwordHash, out passwordSalt);
        user.PasswordSalt = passwordSalt;
        user.PasswordHash = passwordHash;
        user.Exercises = new string[] { };

        await userRepo.InsertOneAsync(user);

        return user;
    }

    public async Task<bool> UserExists(string email)
    {
        var user = await userRepo.FindOneAsync(user => user.Email == email);
        return user != null;
    }

    private static bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
    {
        using var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt);

        var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        for (int i = 0; i < computedHash.Length; i++)
        {
            if (passwordHash[i] != computedHash[i]) return false;
        }

        return true;
    }

    private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
    {
        using (var hmac = new System.Security.Cryptography.HMACSHA512())
        {
            passwordSalt = hmac.Key;
            passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        }
    }
}