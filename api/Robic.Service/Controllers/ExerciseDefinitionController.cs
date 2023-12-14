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
    public async Task<IActionResult> GetExerciseDefinition(string id)
    {
        var definition = await mediator.Send(new GetExerciseDefinitionById
        {
            DefinitionId = id
        });
        if (definition == null) return NotFound();

        if (definition.User != UserId) return Unauthorized();

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

    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(UpdateExerciseDefinitionDto updatedExercise, [FromRoute] string id)
    {
        var definition = await mediator.Send(new GetExerciseDefinitionById
        {
            DefinitionId = id
        });

        if (definition == null) return NotFound();

        if (definition.User != UserId) return Unauthorized();

        var updatedDefinition = await mediator.Send(new UpdateExerciseDefinition
        {
            ExistingDefinition = definition,
            UpdatedDefinition = updatedExercise
        });

        return Ok(updatedDefinition);
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        var definition = await mediator.Send(new GetExerciseDefinitionById
        {
            DefinitionId = id
        });

        if (definition == null) return NotFound();
        if (definition.User != UserId) return Unauthorized();

        await mediator.Send(new DeleteExerciseDefinition
        {
            Definition = definition
        });

        return NoContent();
    }
}