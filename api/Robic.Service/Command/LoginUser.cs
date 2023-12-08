using MediatR;
using Robic.Service.Models;

namespace Robic.Service.Command;

public class LoginUser : IRequest<User>
{
    public required string Email { get; set; }
    public required string Password { get; set; }
}