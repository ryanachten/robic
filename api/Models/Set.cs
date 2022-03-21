using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace RobicServer.Models
{
    public abstract class SetBase
    {
        // TODO: Both value and reps are currently nullable
        // in the database; consider if best approach laster
        [BsonElement("value")]
        public double? Value { get; set; }

        [BsonElement("reps")]
        public int? Reps { get; set; }
    }
    [BsonIgnoreExtraElements]
    public class SetExercise : SetBase
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
    }
    public class Set : SetBase
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }


        [BsonElement("exercises")]
        public SetExercise[] Exercises { get; set; }
    }
}