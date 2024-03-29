using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace Robic.Migrator.Models;

[BsonCollection("exercisedefinitions")]
[BsonIgnoreExtraElements]
public class ExerciseDefinition : Document
{
    [BsonElement("title")]
    public required string Title { get; set; }

    // TODO: should be enum or something
    [BsonElement("unit")]
    public required string Unit { get; set; }

    // TODO: should be enum or something
    [BsonElement("type")]
    public required string Type { get; set; }

    [BsonElement("user")]
    [BsonRepresentation(BsonType.ObjectId)]
    public required string User { get; set; }

    [BsonElement("history")]
    [BsonRepresentation(BsonType.ObjectId)]
    public List<string> History { get; set; } = [];

    [BsonElement("childExercises")]
    [BsonRepresentation(BsonType.ObjectId)]
    public List<string> ChildExercises { get; set; } = [];

    [BsonElement("primaryMuscleGroup")]
    [BsonRepresentation(BsonType.String)]
    public List<string> PrimaryMuscleGroup { get; set; } = [];

    // Computed properties
    [BsonElement("lastSession")]
    public Exercise? LastSession { get; set; }

    [BsonElement("lastImprovement")]
    [Range(0, 100, ErrorMessage = "Value for {0} must be a percentage between {1} and {2}")]
    public double? LastImprovement { get; set; }

    public PersonalBest? PersonalBest { get; set; }
}