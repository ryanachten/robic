using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Robic.Service.Helpers;
using System.Collections.Generic;

namespace Robic.Service.Models;

[BsonCollection("users")]
[BsonIgnoreExtraElements]
public class User : Document
{

    [BsonElement("firstName")]
    public required string FirstName { get; set; }

    [BsonElement("lastName")]
    public required string LastName { get; set; }

    [BsonElement("email")]
    public required string Email { get; set; }

    [BsonElement("passwordHash")]
    public byte[] PasswordHash { get; set; } = [];

    [BsonElement("passwordSalt")]
    public byte[] PasswordSalt { get; set; } = [];

    [BsonElement("exercises")]
    [BsonRepresentation(BsonType.ObjectId)]
    public List<string> Exercises { get; set; } = [];
}