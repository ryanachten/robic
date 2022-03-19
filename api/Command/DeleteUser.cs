using MediatR;
using RobicServer.Models;

namespace RobicServer.Command
{
    public class DeleteUser : IRequest
    {
        public User User { get; set; }
    }
}