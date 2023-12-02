using System.ComponentModel.DataAnnotations;

namespace RobicServer.Models.DTOs;

public class UserForRegisterDto
{
    public required string FirstName { get; set; }

    public required string LastName { get; set; }

    public required string Email { get; set; }

    [StringLength(20, MinimumLength = 4, ErrorMessage = "Password must be between 4 and 20 characters")]
    public required string Password { get; set; }
}