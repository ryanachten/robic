using System.Collections.Generic;

namespace Robic.Service.Models;

public class User
{
    public int Id { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string Email { get; set; }
    // TODO: do we really need this response?
    public List<string> Exercises { get; set; } = [];
}