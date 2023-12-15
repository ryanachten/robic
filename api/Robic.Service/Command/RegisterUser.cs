using MediatR;
using Robic.Service.Models;

namespace Robic.Service.Command;

public class RegisterUser : IRequest<User>
{
    public User User { get; set; }
    public string Password { get; set; }
}