using MediatR;
using Robic.Service.Models.DTOs.User;

namespace Robic.Service.Command;

public class LoginUser : IRequest<LoginResponseDto>
{
    public required string Email { get; set; }
    public required string Password { get; set; }
}