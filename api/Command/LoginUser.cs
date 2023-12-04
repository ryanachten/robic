using MediatR;
using RobicServer.Models;

namespace RobicServer.Command;

public class LoginUser : IRequest<User>
{
    public required string Email { get; set; }
    public required string Password { get; set; }
}