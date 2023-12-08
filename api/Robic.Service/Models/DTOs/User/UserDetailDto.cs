using System.Collections.Generic;

namespace RobicServer.Models.DTOs.User;

public class UserDetailDto
{
    public required string Id { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string Email { get; set; }
    public List<string> Exercises { get; set; } = [];
}