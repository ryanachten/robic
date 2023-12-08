using MediatR;
using RobicServer.Data;
using System.Threading;
using System.Threading.Tasks;

namespace RobicServer.Command;

public class DeleteUserHandler(IUnitOfWork unitOfWork) : IRequestHandler<DeleteUser>
{
    public async Task Handle(DeleteUser request, CancellationToken cancellationToken)
    {
        await unitOfWork.UserRepo.DeleteUser(request.User);
    }
}