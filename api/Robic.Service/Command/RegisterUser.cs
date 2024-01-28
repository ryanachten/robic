using MediatR;
using Robic.Service.Models;

namespace Robic.Service.Command;

public class RegisterUser : IRequest<User>
{
    public required User User { get; set; }
    public required string Password { get; set; }
}