using AutoMapper;
using MediatR;
using Robic.Repository;
using Robic.Service.Models;
using System.Threading;
using System.Threading.Tasks;

namespace Robic.Service.Command;

public class LoginUserHandler(IUserRepository userRepository, IMapper mapper) : IRequestHandler<LoginUser, User?>
{
    public async Task<User?> Handle(LoginUser request, CancellationToken cancellationToken)
    {
        var user = await userRepository.GetUserByEmail(request.Email.ToLower());
        if (user == null) return null;

        if (!VerifyPasswordHash(request.Password, user.PasswordHash, user.PasswordSalt))
            return null;

        return mapper.Map<User>(user);
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
}