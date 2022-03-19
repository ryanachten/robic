using System.Threading;
using System.Threading.Tasks;
using MediatR;
using RobicServer.Data;
using RobicServer.Models;

namespace RobicServer.Command
{
    public class RegisterUserHandler : IRequestHandler<RegisterUser, User>
    {
        private readonly IAuthRepository _authRepo;

        public RegisterUserHandler(IUnitOfWork unitOfWork)
        {
            _authRepo = unitOfWork.AuthRepo;
        }
        public async Task<User> Handle(RegisterUser request, CancellationToken cancellationToken)
        {
            if (await _authRepo.UserExists(request.User.Email))
            {
                throw new System.Exception($"Email {request.User.Email} already registered to Robic");
            }
            return await _authRepo.Register(request.User, request.Password);
        }
    }
}