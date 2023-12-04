using MediatR;
using RobicServer.Data;
using RobicServer.Models;
using System.Threading;
using System.Threading.Tasks;

namespace RobicServer.Command;

public class LoginUserHandler(IUnitOfWork unitOfWork) : IRequestHandler<LoginUser, User>
{
    public Task<User> Handle(LoginUser request, CancellationToken cancellationToken)
    {
        return unitOfWork.AuthRepo.Login(request.Email.ToLower(), request.Password);
    }
}