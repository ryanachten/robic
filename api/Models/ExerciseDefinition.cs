using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using RobicServer.Helpers;

namespace RobicServer.Models
{
    [BsonCollection("exercisedefinitions")]
    [BsonIgnoreExtraElements]
    public class ExerciseDefinition : Document
    {
        [BsonElement("title")]
        public string Title { get; set; }

        // TODO: should be enum or something
        [BsonElement("unit")]
        public string Unit { get; set; }

        // TODO: should be enum or something
        [BsonElement("type")]
        public string Type { get; set; }

        [BsonElement("user")]
        [BsonRepresentation(BsonType.ObjectId)]
        public string User { get; set; }

        [BsonElement("history")]
        [BsonRepresentation(BsonType.ObjectId)]
        private ICollection<string> history;
        public ICollection<string> History
        {
            get
            {
                if (history == null)
                {
                    history = new List<string>();
                }
                return history;
            }
            set { history = value; }
        }


        [BsonElement("childExercises")]
        [BsonRepresentation(BsonType.ObjectId)]
        public ICollection<string> ChildExercises { get; set; }

        [BsonElement("primaryMuscleGroup")]
        [BsonRepresentation(BsonType.String)]
        private List<string> primaryMuscleGroup;
        public List<string> PrimaryMuscleGroup
        {
            get
            {
                if (primaryMuscleGroup == null)
                {
                    primaryMuscleGroup = new List<string>();
                }
                return primaryMuscleGroup;
            }
            set { primaryMuscleGroup = value; }
        }

#nullable enable
        // Computed properties
        [BsonElement("lastSession")]
        public Exercise? LastSession { get; set; }

        [BsonElement("lastImprovement")]
        [Range(0, 100, ErrorMessage = "Value for {0} must be a percentage between {1} and {2}")]
        public double? LastImprovement { get; set; }

        public PersonalBest? PersonalBest { get; set; }
    }
}