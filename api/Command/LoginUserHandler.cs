using System.Threading;
using System.Threading.Tasks;
using MediatR;
using RobicServer.Data;
using RobicServer.Models;

namespace RobicServer.Command
{
    public class LoginUserHandler : IRequestHandler<LoginUser, User>
    {
        private readonly IAuthRepository _authRepo;

        public LoginUserHandler(IUnitOfWork unitOfWork)
        {
            _authRepo = unitOfWork.AuthRepo;
        }
        public Task<User> Handle(LoginUser request, CancellationToken cancellationToken)
        {
            return _authRepo.Login(request.Email.ToLower(), request.Password);
        }
    }
}