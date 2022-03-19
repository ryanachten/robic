using System.Threading;
using System.Threading.Tasks;
using MediatR;
using RobicServer.Data;
using RobicServer.Models;

namespace RobicServer.Query
{
    public class GetUserByIdHandler : IRequestHandler<GetUserById, User>
    {
        private readonly IUserRepository _userRepo;

        public GetUserByIdHandler(IUnitOfWork unitOfWork)
        {
            _userRepo = unitOfWork.UserRepo;
        }
        public Task<User> Handle(GetUserById request, CancellationToken cancellationToken)
        {
            return _userRepo.GetUser(request.UserId);
        }
    }
}