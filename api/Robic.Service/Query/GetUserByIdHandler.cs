using AutoMapper;
using MediatR;
using Robic.Repository;
using Robic.Service.Models;
using System.Threading;
using System.Threading.Tasks;

namespace Robic.Service.Query;

public class GetUserByIdHandler(IUserRepository userRepository, IMapper mapper) : IRequestHandler<GetUserById, User>
{
    public async Task<User> Handle(GetUserById request, CancellationToken cancellationToken)
    {
        var user = await userRepository.GetUserById(request.UserId);
        return mapper.Map<User>(user);
    }
}