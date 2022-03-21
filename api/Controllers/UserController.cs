using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using RobicServer.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using MediatR;
using RobicServer.Query;
using RobicServer.Command;

namespace RobicServer.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;

        public UserController(
            IMapper mapper,
            IMediator mediator
        )
        {
            _mapper = mapper;
            _mediator = mediator;
        }

        [HttpGet("{id:length(24)}", Name = "GetUser")]
        public async Task<IActionResult> Get(string id)
        {
            string userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            if (userId != id)
                return Unauthorized();

            var user = await _mediator.Send(new GetUserById
            {
                UserId = id
            });

            if (user == null)
                return NotFound();

            var userForReturn = _mapper.Map<UserForDetailDto>(user);
            return Ok(userForReturn);
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            string userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            if (userId != id)
                return Unauthorized();

            var user = await _mediator.Send(new GetUserById
            {
                UserId = id
            });
            if (user == null)
                return NotFound();

            await _mediator.Send(new DeleteUser
            {
                User = user
            });

            return NoContent();
        }
    }
}