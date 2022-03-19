using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using RobicServer.Helpers;

namespace RobicServer.Models
{
    [BsonCollection("users")]
    [BsonIgnoreExtraElements]
    public class User : Document
    {

        [BsonElement("firstName")]
        public string FirstName { get; set; }

        [BsonElement("lastName")]
        public string LastName { get; set; }

        [BsonElement("email")]
        public string Email { get; set; }

        [BsonElement("passwordHash")]
        public byte[] PasswordHash { get; set; }

        [BsonElement("passwordSalt")]
        public byte[] PasswordSalt { get; set; }

        [BsonElement("exercises")]
        [BsonRepresentation(BsonType.ObjectId)]
        public ICollection<string> Exercises { get; set; }
    }
}