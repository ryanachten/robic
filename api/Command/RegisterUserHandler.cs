using MediatR;
using RobicServer.Data;
using RobicServer.Models;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace RobicServer.Command;

public class RegisterUserHandler(IUnitOfWork unitOfWork) : IRequestHandler<RegisterUser, User>
{
    public async Task<User> Handle(RegisterUser request, CancellationToken cancellationToken)
    {
        if (await unitOfWork.AuthRepo.UserExists(request.User.Email))
        {
            throw new ArgumentException($"Email {request.User.Email} already registered to Robic");
        }
        return await unitOfWork.AuthRepo.Register(request.User, request.Password);
    }
}