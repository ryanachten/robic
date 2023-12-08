using MediatR;
using Robic.Service.Data;
using System.Threading;
using System.Threading.Tasks;

namespace Robic.Service.Command;

public class DeleteUserHandler(IUnitOfWork unitOfWork) : IRequestHandler<DeleteUser>
{
    public async Task Handle(DeleteUser request, CancellationToken cancellationToken)
    {
        await unitOfWork.UserRepo.DeleteUser(request.User);
    }
}