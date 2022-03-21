using MediatR;
using RobicServer.Models;

namespace RobicServer.Command
{
    public class LoginUser : IRequest<User>
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}