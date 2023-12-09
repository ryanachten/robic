using MediatR;

namespace Robic.Service.Command;

public class DeleteUserById : IRequest
{
    public required string UserId { get; set; }
}