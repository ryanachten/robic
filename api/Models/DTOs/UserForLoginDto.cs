namespace RobicServer.Models.DTOs;

public class UserForLoginDto
{
    public required string Email { get; set; }

    public required string Password { get; set; }
}