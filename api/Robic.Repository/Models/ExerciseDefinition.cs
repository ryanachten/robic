namespace Robic.Repository.Models;

public class ExerciseDefinition
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public required string Unit { get; set; } // TODO: this should probably be an enum or something
    public required int UserId { get; set; }
}
