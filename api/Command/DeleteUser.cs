using MediatR;
using RobicServer.Models;

namespace RobicServer.Command;

public class DeleteUser : IRequest
{
    public required User User { get; set; }
}