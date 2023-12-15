using MediatR;
using Robic.Service.Models;

namespace Robic.Service.Query;

public class GetUserById : IRequest<User>
{
    public required string UserId { get; set; }
}