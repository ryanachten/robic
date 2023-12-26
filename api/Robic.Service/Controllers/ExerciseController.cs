using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Robic.Service.Command;
using Robic.Service.Models;
using Robic.Service.Models.DTOs.Exercise;
using Robic.Service.Query;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Robic.Service.Controllers;

public class ExerciseController(IMediator mediator) : BaseController
{
    /// <summary>
    /// Retrieves list of exercises for a definition
    /// </summary>
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<Exercise>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetDefinitionExercises([FromQuery(Name = "definition")] int definitionId)
    {
        var exercises = await mediator.Send(new GetExercisesByDefinition
        {
            DefinitionId = definitionId,
            UserId = GetUserId()
        });

        return Ok(exercises);
    }

    /// <summary>
    /// Retrieves exercise details
    /// </summary>
    [HttpGet("{id}", Name = "GetExercise")]
    [ProducesResponseType(typeof(Exercise), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
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

    /// <summary>
    /// Creates an exercise
    /// </summary>
    [HttpPost]
    [ProducesResponseType(typeof(Exercise), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<IActionResult> CreateExercise(UpdateExerciseDto exercise)
    {
        var isUserDefinition = await IsUserDefinition(exercise.DefinitionId);
        if (!isUserDefinition) return Forbid();

        var createdExercise = await mediator.Send(new CreateExercise
        {
            UserId = GetUserId(),
            Exercise = exercise
        });

        return CreatedAtRoute("GetExercise", new { id = createdExercise.Id }, createdExercise);
    }

    /// <summary>
    /// Updates exercise details
    /// </summary>
    [HttpPut("{id}")]
    [ProducesResponseType(typeof(Exercise), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateExercise(int id, UpdateExerciseDto updatedExercise)
    {
        var isUserDefinition = await IsUserDefinition(updatedExercise.DefinitionId);
        if (!isUserDefinition) return Forbid();

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

    /// <summary>
    /// Deletes an exercise and related resources
    /// </summary>
    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteExercise(int id)
    {
        var exercise = await mediator.Send(new GetExerciseById
        {
            ExerciseId = id
        });
        if (exercise == null) return NotFound();

        var isUserExercise = await IsUserDefinition(exercise.DefinitionId);
        if (!isUserExercise) return Forbid();

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