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
    public async Task<IActionResult> GetDefinitionExercises([FromQuery(Name = "definition")] string definitionId)
    {
        var definition = await mediator.Send(new GetExerciseDefinitionById
        {
            DefinitionId = definitionId
        });

        if (definition == null) return NotFound();
        if (definition.User != UserId) return Unauthorized();

        var exercises = await mediator.Send(new GetExercisesByDefinition
        {
            DefinitionId = definitionId
        });

        return Ok(exercises);
    }

    [HttpGet("{id:length(24)}", Name = "GetExercise")]
    public async Task<IActionResult> GetExerciseById(string id)
    {
        var exercise = await mediator.Send(new GetExerciseById
        {
            ExerciseId = id
        });

        if (exercise == null) return NotFound();

        var isUserExercise = await IsUsersDefinition(exercise.Definition);
        if (!isUserExercise) return Unauthorized();

        return Ok(exercise);
    }

    [HttpPost]
    public async Task<IActionResult> CreateExercise(UpdateExerciseDto exercise)
    {
        var definition = await mediator.Send(new GetExerciseDefinitionById
        {
            DefinitionId = exercise.Definition
        });

        if (definition == null || definition.User != UserId) return Unauthorized();

        var createdExercise = await mediator.Send(new CreateExercise
        {
            Definition = definition,
            Exercise = exercise
        });

        return CreatedAtRoute("GetExercise", new { id = createdExercise.Id }, createdExercise);
    }

    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> UpdateExercise(string id, UpdateExerciseDto updatedExercise)
    {
        var isUserExercise = await IsUsersDefinition(updatedExercise.Definition);
        if (!isUserExercise) return Unauthorized();

        var exercise = await mediator.Send(new GetExerciseById
        {
            ExerciseId = id
        });
        if (exercise == null) return NotFound();

        var result = await mediator.Send(new UpdateExercise
        {
            Exercise = updatedExercise
        });

        return Ok(result);
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> DeleteExercise(string id)
    {
        var exercise = await mediator.Send(new GetExerciseById
        {
            ExerciseId = id
        });
        if (exercise == null) return NotFound();

        var definition = await mediator.Send(new GetExerciseDefinitionById
        {
            DefinitionId = exercise.Definition
        });

        if (definition == null || definition.User != UserId)
            return Unauthorized();

        await mediator.Send(new DeleteExercise
        {
            ExerciseId = id,
            Definition = definition
        });

        return NoContent();
    }

    private async Task<bool> IsUsersDefinition(string definitionId)
    {
        var definition = await mediator.Send(new GetExerciseDefinitionById
        {
            DefinitionId = definitionId
        });

        return definition != null && definition.User == UserId;
    }
}