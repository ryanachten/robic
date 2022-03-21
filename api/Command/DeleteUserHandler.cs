using MediatR;
using RobicServer.Data;

namespace RobicServer.Command
{
    public class DeleteUserHandler : RequestHandler<DeleteUser>
    {
        private readonly IUserRepository _userRepo;

        public DeleteUserHandler(IUnitOfWork unitOfWork)
        {
            _userRepo = unitOfWork.UserRepo;
        }
        protected override async void Handle(DeleteUser request)
        {

            await _userRepo.DeleteUser(request.User);
        }
    }
}