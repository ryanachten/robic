using System.Collections.Generic;

namespace RobicServer.Models.DTOs
{
    public class UserForDetailDto
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public ICollection<string> Exercises { get; set; }
    }
}