using AutoMapper;
using MediatR;
using Robic.Repository;
using Robic.Repository.Models.DTOs.User;
using Robic.Service.Models;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Robic.Service.Command;

public class RegisterUserHandler(IUserRepository userRepository, IMapper mapper) : IRequestHandler<RegisterUser, User>
{
    public async Task<User> Handle(RegisterUser request, CancellationToken cancellationToken)
    {
        var existingUser = await userRepository.GetUserByEmail(request.User.Email);
        if (existingUser != null)
        {
            throw new ArgumentException($"Email {request.User.Email} already registered to Robic");
        }

        CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);

        await userRepository.CreateUser(new RegisterUserDto()
        {
            FirstName = request.User.FirstName,
            LastName = request.User.LastName,
            Email = request.User.Email,
            PasswordHash = passwordHash,
            PasswordSalt = passwordSalt,
        });

        var registeredUser = await userRepository.GetUserByEmail(request.User.Email);

        return mapper.Map<User>(registeredUser);
    }

    private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
    {
        using var hmac = new System.Security.Cryptography.HMACSHA512();

        passwordSalt = hmac.Key;
        passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
    }
}