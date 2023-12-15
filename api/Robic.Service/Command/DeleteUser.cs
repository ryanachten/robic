using MediatR;
using Robic.Service.Models;

namespace Robic.Service.Command;

public class DeleteUser : IRequest
{
    public required User User { get; set; }
}