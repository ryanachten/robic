using MediatR;
using Robic.Repository;
using System.Threading;
using System.Threading.Tasks;

namespace Robic.Service.Command;

public class DeleteUserByIdHandler(IUserRepository userRepository) : IRequestHandler<DeleteUserById>
{
    public async Task Handle(DeleteUserById request, CancellationToken cancellationToken)
    {
        await userRepository.DeleteUserById(request.UserId);
    }
}