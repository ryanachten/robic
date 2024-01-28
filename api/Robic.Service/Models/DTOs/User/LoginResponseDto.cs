namespace Robic.Service.Models.DTOs.User;

public class LoginResponseDto
{
    public required string Token { get; set; }
    public required UserDetailDto UserDetails { get; set; }
}
