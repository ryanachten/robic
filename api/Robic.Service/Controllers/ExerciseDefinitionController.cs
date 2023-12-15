using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Robic.Service.Command;
using Robic.Service.Models.DTOs.ExerciseDefinition;
using Robic.Service.Query;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Robic.Service.Controllers;

public class ExerciseDefinitionController(IMapper mapper, IMediator mediator) : BaseController
{
    [HttpGet]
    public async Task<IActionResult> GetDefinition()
    {
        if (UserId == null) return Unauthorized();

        var response = await mediator.Send(new GetExerciseDefinitions
        {
            UserId = UserId
        });

        var definitions = mapper.Map<List<ListExerciseDefinitionDto>>(response);

        return Ok(definitions);
    }

    [HttpGet("{id:length(24)}", Name = "GetExerciseDefinition")]
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
        if (exerciseToCreate.User != UserId) return Unauthorized();

        var definition = await mediator.Send(new CreateExerciseDefinition
        {
            UserId = UserId,
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