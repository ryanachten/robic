using System.Collections.Generic;

namespace Robic.Service.Models.DTOs.Exercise;

public class UpdateSetDto : BaseSet
{
}

public class CreateSetExerciseDto
{
    public List<UpdateSetDto> Exercises { get; set; } = [];
}