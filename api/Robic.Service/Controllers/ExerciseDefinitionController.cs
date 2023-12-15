using MediatR;
using Microsoft.AspNetCore.Mvc;
using Robic.Service.Command;
using Robic.Service.Models.DTOs.ExerciseDefinition;
using Robic.Service.Query;
using System.Threading.Tasks;

namespace Robic.Service.Controllers;

public class ExerciseDefinitionController(IMediator mediator) : BaseController
{
    [HttpGet]
    public async Task<IActionResult> GetDefinitions()
    {
        var response = await mediator.Send(new GetExerciseDefinitions
        {
            UserId = GetUserId()
        });

        return Ok(response);
    }

    [HttpGet("{id}", Name = "GetExerciseDefinition")]
    public async Task<IActionResult> GetExerciseDefinitionById(int id)
    {
        var definition = await mediator.Send(new GetExerciseDefinitionById
        {
            DefinitionId = id
        });

        if (definition == null) return NotFound();
        if (definition.UserId != GetUserId()) return Unauthorized();

        return Ok(definition);
    }

    [HttpPost]
    public async Task<IActionResult> CreateDefinition(UpdateExerciseDefinitionDto exerciseToCreate)
    {
        if (exerciseToCreate.User != GetUserId()) return Unauthorized();

        var existingDefinition = await mediator.Send(new GetExerciseDefinitionByTitle()
        {
            Title = exerciseToCreate.Title,
            UserId = exerciseToCreate.User
        });
        if (existingDefinition != null) return BadRequest($"Exercise definition with title {exerciseToCreate.Title} already exists");

        var definition = await mediator.Send(new CreateExerciseDefinition
        {
            UserId = exerciseToCreate.User,
            Definition = exerciseToCreate
        });

        return CreatedAtRoute("GetExerciseDefinition", new { id = definition.Id }, definition);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateDefinition(UpdateExerciseDefinitionDto updatedExercise, [FromRoute] int id)
    {
        var definition = await mediator.Send(new GetExerciseDefinitionById
        {
            DefinitionId = id
        });

        if (definition == null) return NotFound();
        if (definition.UserId != GetUserId()) return Unauthorized();

        var updatedDefinition = await mediator.Send(new UpdateExerciseDefinition
        {
            DefinitionId = id,
            UpdatedDefinition = updatedExercise
        });
        if (updatedDefinition == null) return NotFound();

        return Ok(updatedDefinition);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteDefinition(int id)
    {
        var definition = await mediator.Send(new GetExerciseDefinitionById
        {
            DefinitionId = id
        });

        if (definition == null) return NotFound();
        if (definition.UserId != GetUserId()) return Unauthorized();

        await mediator.Send(new DeleteExerciseDefinition
        {
            DefinitionId = id
        });

        return NoContent();
    }
}