using MediatR;
using RobicServer.Models;

namespace RobicServer.Command
{
    public class RegisterUser : IRequest<User>
    {
        public User User { get; set; }
        public string Password { get; set; }
    }
}