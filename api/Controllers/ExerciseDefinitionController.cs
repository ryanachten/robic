using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using RobicServer.Command;
using RobicServer.Models;
using RobicServer.Models.DTOs;
using RobicServer.Query;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RobicServer.Controllers;

public class ExerciseDefinitionController(IMapper mapper, IMediator mediator) : BaseController
{
    [HttpGet]
    public async Task<IActionResult> GetDefinition()
    {
        var response = await mediator.Send(new GetExerciseDefinitions
        {
            UserId = _userId
        });
        var definitions = mapper.Map<List<ExerciseDefinitionForListDto>>(response);

        return Ok(definitions);
    }

    [HttpGet("{id:length(24)}")]
    public async Task<IActionResult> GetExerciseDefinition(string id)
    {
        var definition = await mediator.Send(new GetExerciseDefinitionById
        {
            DefinitionId = id
        });
        if (definition == null) return NotFound();

        if (definition.User != _userId) return Unauthorized();

        return Ok(definition);
    }

    [HttpPost]
    public async Task<IActionResult> CreateDefinition(ExerciseDefinition exerciseToCreate)
    {
        if (exerciseToCreate.User != _userId) return Unauthorized();

        var definition = await mediator.Send(new CreateExerciseDefinition
        {
            UserId = _userId,
            Definition = exerciseToCreate
        });

        return CreatedAtRoute("GetExerciseDefinition", new { id = definition.Id }, definition);
    }

    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(ExerciseDefinition updatedExercise)
    {
        var definition = await mediator.Send(new GetExerciseDefinitionById
        {
            DefinitionId = updatedExercise.Id
        });

        if (definition == null) return NotFound();

        if (definition.User != _userId) return Unauthorized();

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
        if (definition.User != _userId) return Unauthorized();

        await mediator.Send(new DeleteExerciseDefinition
        {
            Definition = definition
        });

        return NoContent();
    }
}