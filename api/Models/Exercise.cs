using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using RobicServer.Helpers;
using System;
using System.Collections.Generic;

namespace RobicServer.Models;

[BsonCollection("exercises")]
[BsonIgnoreExtraElements]
public class Exercise : Document
{
    [BsonElement("definition")]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Definition { get; set; }

    [BsonElement("date")]
    public DateTime Date { get; set; }

    [BsonElement("timeTaken")]
    public DateTime TimeTaken { get; set; }

    [BsonElement("sets")]
    public ICollection<Set> Sets { get; set; }

    public double? NetValue
    {
        get
        {
            double? total = null;
            foreach (Set set in this.Sets)
            {
                if (set.Reps.HasValue && set.Value.HasValue)
                {
                    if (total == null)
                    {
                        total = 0.0;
                    }
                    total += ((int)set.Reps * (double)set.Value);
                }

            }
            return total;
        }
    }
}