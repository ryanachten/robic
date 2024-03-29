using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Robic.Migrator.Models;

public interface IDocument
{
    string Id { get; set; }
}

public abstract class Document : IDocument
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public required string Id { get; set; }
}