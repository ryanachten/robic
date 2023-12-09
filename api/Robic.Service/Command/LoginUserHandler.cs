using AutoMapper;
using MediatR;
using Microsoft.IdentityModel.Tokens;
using Robic.Repository;
using Robic.Service.Models.DTOs.User;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Robic.Service.Command;

public class LoginUserHandler(IUserRepository userRepository, IMapper mapper) : IRequestHandler<LoginUser, LoginResponseDto?>
{
    public async Task<LoginResponseDto?> Handle(LoginUser request, CancellationToken cancellationToken)
    {
        var user = await userRepository.GetUserByEmail(request.Email.ToLower());
        if (user == null) return null;

        if (!VerifyPasswordHash(request.Password, user.PasswordHash, user.PasswordSalt))
            return null;

        var userDetails = mapper.Map<UserDetailDto>(user);

        return new LoginResponseDto
        {
            Token = GenerateToken(userDetails),
            UserDetails = userDetails
        };
    }

    private static bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
    {
        using var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt);

        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
        for (int i = 0; i < computedHash.Length; i++)
        {
            if (passwordHash[i] != computedHash[i]) return false;
        }

        return true;
    }

    private static string GenerateToken(UserDetailDto user)
    {
        var claims = new[]{
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(ClaimTypes.Email, user.Email),
        };

        var tokenKey = Environment.GetEnvironmentVariable("TokenKey");
        if (tokenKey == null) throw new UnauthorizedAccessException("Missing singing token key in environment configurtion");

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey));

        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.Now.AddYears(1),
            SigningCredentials = credentials
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }
}