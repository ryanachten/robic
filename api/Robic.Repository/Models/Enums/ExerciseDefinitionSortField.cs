using System.ComponentModel;

namespace Robic.Repository.Models.Enums;

// Descriptions must correlate with the columns in the table we want to sort by
public enum ExerciseDefinitionSortField
{
    [Description("Title")]
    TITLE,

    [Description("LastSessionDate")]
    LAST_ACTIVE,

    [Description("LastImprovement")]
    LAST_IMPROVEMENT,

    [Description("SessionCount")]
    NUMBER_OF_SESSIONS
}
