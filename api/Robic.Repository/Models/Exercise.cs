namespace Robic.Repository.Models;

public class Exercise
{
    public int Id { get; set; }
    public required int DefinitionId { get; set; }
    public required int UserId { get; set; }
    public required DateTime Date { get; set; }
    public DateTime TimeTaken { get; set; }
}
