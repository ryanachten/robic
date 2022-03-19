using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using RobicServer.Models;
using System.Threading.Tasks;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using RobicServer.Models.DTOs;
using MediatR;
using RobicServer.Query;
using RobicServer.Command;

namespace RobicServer.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ExerciseDefinitionController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;

        public ExerciseDefinitionController(
            IMapper mapper,
            IMediator mediator
        )
        {
            _mapper = mapper;
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetDefinition()
        {
            string userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var definitions = await _mediator.Send(new GetExerciseDefinitions
            {
                UserId = userId
            });
            var defintionsToReturn = _mapper.Map<List<ExerciseDefinitionForListDto>>(definitions);
            return Ok(defintionsToReturn);
        }

        [HttpGet("{id:length(24)}", Name = "GetExerciseDefinition")]
        public async Task<IActionResult> GetExeciseDefinition(string id)
        {
            var definition = await _mediator.Send(new GetExerciseDefinitionById
            {
                DefinitionId = id
            });
            if (definition == null)
                return NotFound();

            if (definition.User != User.FindFirst(ClaimTypes.NameIdentifier).Value)
                return Unauthorized();

            return Ok(definition);
        }

        [HttpPost]
        public async Task<IActionResult> CreateDefinition(ExerciseDefinition exerciseToCreate)
        {
            string userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            if (exerciseToCreate.User != userId)
                return Unauthorized();

            var definition = await _mediator.Send(new CreateExerciseDefinition
            {
                UserId = userId,
                Definition = exerciseToCreate
            });

            return CreatedAtRoute("GetExerciseDefinition", new { id = definition.Id }, definition);
        }

        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(ExerciseDefinition updatedExercise)
        {
            var definition = await _mediator.Send(new GetExerciseDefinitionById
            {
                DefinitionId = updatedExercise.Id
            });

            if (definition == null)
                return NotFound();

            if (definition.User != User.FindFirst(ClaimTypes.NameIdentifier).Value)
                return Unauthorized();

            var updatedDefinition = await _mediator.Send(new UpdateExerciseDefinition
            {
                ExistingDefinition = definition,
                UpdatedDefinition = updatedExercise
            });

            return Ok(updatedDefinition);
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var definition = await _mediator.Send(new GetExerciseDefinitionById
            {
                DefinitionId = id
            });
            if (definition == null)
                return NotFound();

            string userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            if (definition.User != userId)
                return Unauthorized();

            await _mediator.Send(new DeleteExerciseDefinition
            {
                Definition = definition
            });

            return NoContent();
        }
    }
}