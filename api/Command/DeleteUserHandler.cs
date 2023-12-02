using MediatR;
using RobicServer.Data;
using System.Threading;
using System.Threading.Tasks;

namespace RobicServer.Command;

public class DeleteUserHandler : IRequestHandler<DeleteUser>
{
    private readonly IUserRepository _userRepo;

    public DeleteUserHandler(IUnitOfWork unitOfWork)
    {
        _userRepo = unitOfWork.UserRepo;
    }

    public async Task Handle(DeleteUser request, CancellationToken cancellationToken)
    {
        await _userRepo.DeleteUser(request.User);
    }
}