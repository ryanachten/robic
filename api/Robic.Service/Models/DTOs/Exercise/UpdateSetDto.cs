using System.Collections.Generic;

namespace RobicServer.Models.DTOs.Exercise;

public class UpdateSetDto : BaseSet
{
}

public class CreateSetExerciseDto
{
    public List<UpdateSetDto> Exercises { get; set; } = [];
}