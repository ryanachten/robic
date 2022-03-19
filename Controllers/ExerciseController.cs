using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RobicServer.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using MediatR;
using RobicServer.Command;
using RobicServer.Query;

namespace RobicServer.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ExerciseController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ExerciseController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetDefinitionExercises([FromQuery(Name = "definition")] string definitionId)
        {
            string userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var definition = await _mediator.Send(new GetExerciseDefinitionById
            {
                DefinitionId = definitionId
            });
            if (definition == null)
                return NotFound();

            if (definition.User != userId)
                return Unauthorized();

            var exercises = await _mediator.Send(new GetExercisesByDefinition
            {
                DefinitionId = definitionId
            });
            return Ok(exercises);
        }

        [HttpGet("{id:length(24)}", Name = "GetExercise")]
        public async Task<IActionResult> GetExerciseById(string id)
        {
            var exercise = await _mediator.Send(new GetExerciseById
            {
                ExerciseId = id
            });
            if (exercise == null)
                return NotFound();

            var isUserExercise = await IsUsersDefinition(exercise.Definition);
            if (!isUserExercise)
                return Unauthorized();

            return Ok(exercise);
        }

        [HttpPost]
        public async Task<IActionResult> CreateExercise(Exercise exercise)
        {
            string userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var definition = await _mediator.Send(new GetExerciseDefinitionById
            {
                DefinitionId = exercise.Definition
            });

            if (definition == null || definition.User != userId)
                return Unauthorized();

            var createdExercise = await _mediator.Send(new CreateExercise
            {
                Definition = definition,
                Exercise = exercise
            });

            return CreatedAtRoute("GetExercise", new { id = createdExercise.Id }, createdExercise);
        }

        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> UpdateExercise(string id, Exercise updatedExercise)
        {
            var isUserExercise = await IsUsersDefinition(updatedExercise.Definition);
            if (!isUserExercise)
                return Unauthorized();

            var exercise = await _mediator.Send(new GetExerciseById
            {
                ExerciseId = id
            });
            if (exercise == null)
                return NotFound();

            var result = await _mediator.Send(new UpdateExercise
            {
                Exercise = updatedExercise
            });
            return Ok(result);
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> DeleteExercise(string id)
        {
            var exercise = await _mediator.Send(new GetExerciseById
            {
                ExerciseId = id
            });
            if (exercise == null)
                return NotFound();

            string userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var definition = await _mediator.Send(new GetExerciseDefinitionById
            {
                DefinitionId = exercise.Definition
            });

            if (definition == null || definition.User != userId)
                return Unauthorized();

            await _mediator.Send(new DeleteExercise
            {
                ExerciseId = id,
                Definition = definition
            });
            return NoContent();
        }

        private async Task<bool> IsUsersDefinition(string definitionId)
        {
            string userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var definition = await _mediator.Send(new GetExerciseDefinitionById
            {
                DefinitionId = definitionId
            });
            return definition != null && definition.User == userId;
        }
    }
}