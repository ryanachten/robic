using MediatR;
using RobicServer.Data;
using RobicServer.Models;
using System.Threading;
using System.Threading.Tasks;

namespace RobicServer.Query;

public class GetUserByIdHandler(IUnitOfWork unitOfWork) : IRequestHandler<GetUserById, User>
{
    public Task<User> Handle(GetUserById request, CancellationToken cancellationToken)
    {
        return unitOfWork.UserRepo.GetUser(request.UserId);
    }
}