using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Robic.Migrator.Models;

public abstract class BaseSet
{
    // TODO: Both value and reps are currently nullable
    // in the database; consider if best approach later
    [BsonElement("value")]
    public double? Value { get; set; }

    [BsonElement("reps")]
    public int? Reps { get; set; }
}

[BsonIgnoreExtraElements]
public class SetExercise : BaseSet
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public required string Id { get; set; }
}

public class Set : BaseSet
{
    // TODO: is this ID actually used or needed?
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public required string Id { get; set; }


    [BsonElement("exercises")]
    public SetExercise[]? Exercises { get; set; }
}