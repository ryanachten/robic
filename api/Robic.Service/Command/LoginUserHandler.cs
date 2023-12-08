using MediatR;
using Robic.Service.Data;
using Robic.Service.Models;
using System.Threading;
using System.Threading.Tasks;

namespace Robic.Service.Command;

public class LoginUserHandler(IUnitOfWork unitOfWork) : IRequestHandler<LoginUser, User>
{
    public Task<User> Handle(LoginUser request, CancellationToken cancellationToken)
    {
        return unitOfWork.AuthRepo.Login(request.Email.ToLower(), request.Password);
    }
}