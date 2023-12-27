using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Robic.Service.Command;
using Robic.Service.Models;
using Robic.Service.Models.DTOs.ExerciseDefinition;
using Robic.Service.Query;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Robic.Service.Controllers;

public class ExerciseDefinitionController(IMediator mediator) : BaseController
{
    /// <summary>
    /// Retrieves list of user exercise definitions
    /// </summary>
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<ExerciseDefinitionSummary>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetDefinitions()
    {
        var response = await mediator.Send(new GetExerciseDefinitions
        {
            UserId = UserId
        });

        return Ok(response);
    }

    /// <summary>
    /// Retrieves exercise definition details
    /// </summary>
    [HttpGet("{id}", Name = "GetExerciseDefinition")]
    [ProducesResponseType(typeof(ExerciseDefinition), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<IActionResult> GetExerciseDefinitionById(int id)
    {
        var definition = await mediator.Send(new GetExerciseDefinitionById
        {
            DefinitionId = id
        });

        if (definition == null) return NotFound();
        if (definition.UserId != UserId) return Forbid();

        return Ok(definition);
    }

    /// <summary>
    /// Creates an exercise definition
    /// </summary>
    [HttpPost]
    [ProducesResponseType(typeof(ExerciseDefinition), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<IActionResult> CreateDefinition(UpdateExerciseDefinitionDto exerciseToCreate)
    {
        if (exerciseToCreate.UserId != UserId) return Forbid();

        var existingDefinition = await mediator.Send(new GetExerciseDefinitionByTitle()
        {
            Title = exerciseToCreate.Title,
            UserId = exerciseToCreate.UserId
        });
        if (existingDefinition != null) return BadRequest($"Exercise definition with title {exerciseToCreate.Title} already exists");

        var definition = await mediator.Send(new CreateExerciseDefinition
        {
            Definition = exerciseToCreate
        });

        return CreatedAtRoute("GetExerciseDefinition", new { id = definition.Id }, definition);
    }

    /// <summary>
    /// Updates exercise definition details
    /// </summary>
    [HttpPut("{id}")]
    [ProducesResponseType(typeof(ExerciseDefinition), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<IActionResult> UpdateDefinition(UpdateExerciseDefinitionDto updatedExercise, [FromRoute] int id)
    {
        var definition = await mediator.Send(new GetExerciseDefinitionById
        {
            DefinitionId = id
        });

        if (definition == null) return NotFound();
        if (definition.UserId != UserId) return Forbid();

        var updatedDefinition = await mediator.Send(new UpdateExerciseDefinition
        {
            DefinitionId = id,
            UpdatedDefinition = updatedExercise
        });
        if (updatedDefinition == null) return NotFound();

        return Ok(updatedDefinition);
    }

    /// <summary>
    /// Deletes an exercise definition and associated resources
    /// </summary>
    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<IActionResult> DeleteDefinition(int id)
    {
        var definition = await mediator.Send(new GetExerciseDefinitionById
        {
            DefinitionId = id
        });

        if (definition == null) return NotFound();
        if (definition.UserId != UserId) return Forbid();

        await mediator.Send(new DeleteExerciseDefinition
        {
            DefinitionId = id
        });

        return NoContent();
    }
}