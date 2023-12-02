using MediatR;
using RobicServer.Models;

namespace RobicServer.Query;

public class GetUserById : IRequest<User>
{
    public required string UserId { get; set; }
}