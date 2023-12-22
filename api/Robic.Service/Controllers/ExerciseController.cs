using MediatR;
using Microsoft.AspNetCore.Mvc;
using Robic.Service.Command;
using Robic.Service.Models.DTOs.Exercise;
using Robic.Service.Query;
using System.Threading.Tasks;

namespace Robic.Service.Controllers;

public class ExerciseController(IMediator mediator) : BaseController
{
    [HttpGet]
    public async Task<IActionResult> GetDefinitionExercises([FromQuery(Name = "definition")] int definitionId)
    {
        var exercises = await mediator.Send(new GetExercisesByDefinition
        {
            DefinitionId = definitionId,
            UserId = GetUserId()
        });

        return Ok(exercises);
    }

    [HttpGet("{id}", Name = "GetExercise")]
    public async Task<IActionResult> GetExerciseById(int id)
    {
        var exercise = await mediator.Send(new GetExerciseById
        {
            ExerciseId = id,
        });

        if (exercise == null) return NotFound();

        var isUserDefinition = await IsUserDefinition(exercise.DefinitionId);
        if (!isUserDefinition) return Unauthorized();

        return Ok(exercise);
    }

    [HttpPost]
    public async Task<IActionResult> CreateExercise(UpdateExerciseDto exercise)
    {
        var isUserDefinition = await IsUserDefinition(exercise.DefinitionId);
        if (!isUserDefinition) return Unauthorized();

        var createdExercise = await mediator.Send(new CreateExercise
        {
            UserId = GetUserId(),
            Exercise = exercise
        });

        return CreatedAtRoute("GetExercise", new { id = createdExercise.Id }, createdExercise);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateExercise(int id, UpdateExerciseDto updatedExercise)
    {
        var isUserDefinition = await IsUserDefinition(updatedExercise.DefinitionId);
        if (!isUserDefinition) return Unauthorized();

        var exercise = await mediator.Send(new GetExerciseById
        {
            ExerciseId = id
        });
        if (exercise == null) return NotFound();

        var result = await mediator.Send(new UpdateExercise
        {
            ExerciseId = exercise.Id,
            DefinitionId = exercise.DefinitionId,
            Exercise = updatedExercise
        });

        return Ok(result);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteExercise(int id)
    {
        var exercise = await mediator.Send(new GetExerciseById
        {
            ExerciseId = id
        });
        if (exercise == null) return NotFound();

        var isUserExercise = await IsUserDefinition(exercise.DefinitionId);
        if (!isUserExercise) return Unauthorized();

        await mediator.Send(new DeleteExercise
        {
            ExerciseId = id,
        });

        return NoContent();
    }

    private async Task<bool> IsUserDefinition(int definitionId)
    {
        var definition = await mediator.Send(new GetExerciseDefinitionById
        {
            DefinitionId = definitionId
        });

        return definition != null && definition.UserId == GetUserId();
    }
}