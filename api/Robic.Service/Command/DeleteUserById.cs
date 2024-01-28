using MediatR;

namespace Robic.Service.Command;

public class DeleteUserById : IRequest
{
    public required int UserId { get; set; }
}