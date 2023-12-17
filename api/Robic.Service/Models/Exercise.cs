using System;
using System.Collections.Generic;

namespace Robic.Service.Models;

public class Exercise
{
    public required int Id { get; set; }
    public required int DefinitionId { get; set; }
    public DateTime Date { get; set; }
    public DateTime TimeTaken { get; set; }
    public List<Set> Sets { get; set; } = [];

    public double? NetValue
    {
        get
        {
            double total = 0.0;
            foreach (Set set in Sets)
            {
                total += set.Reps * set.Value;
            }
            return total;
        }
    }
}