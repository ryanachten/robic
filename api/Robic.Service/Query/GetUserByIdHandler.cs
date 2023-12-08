using MediatR;
using Robic.Service.Data;
using Robic.Service.Models;
using System.Threading;
using System.Threading.Tasks;

namespace Robic.Service.Query;

public class GetUserByIdHandler(IUnitOfWork unitOfWork) : IRequestHandler<GetUserById, User>
{
    public Task<User> Handle(GetUserById request, CancellationToken cancellationToken)
    {
        return unitOfWork.UserRepo.GetUser(request.UserId);
    }
}