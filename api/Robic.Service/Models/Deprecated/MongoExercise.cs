using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Robic.Service.Helpers;
using System;
using System.Collections.Generic;

namespace Robic.Service.Models.Deprecated;

[Obsolete("Use non-MongoDB class")]
[BsonCollection("exercises")]
[BsonIgnoreExtraElements]
public class MongoExercise : Document
{
    [BsonElement("definition")]
    [BsonRepresentation(BsonType.ObjectId)]
    public required string Definition { get; set; }

    [BsonElement("date")]
    public DateTime Date { get; set; }

    [BsonElement("timeTaken")]
    public DateTime TimeTaken { get; set; }

    [BsonElement("sets")]
    public List<MongoSet> Sets { get; set; } = [];

    public double? NetValue
    {
        get
        {
            double? total = null;
            foreach (MongoSet set in Sets)
            {
                if (set.Reps.HasValue && set.Value.HasValue)
                {
                    total ??= 0.0;
                    total += set.Reps * set.Value;
                }

            }
            return total;
        }
    }
}