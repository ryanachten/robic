using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace RobicServer.Models
{
    public interface IDocument
    {
        string Id { get; set; }
    }

    public abstract class Document : IDocument
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
    }
}