using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RobicServer.Command;
using RobicServer.Models.DTOs;
using RobicServer.Query;
using System.Security.Claims;
using System.Threading.Tasks;

namespace RobicServer.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class UserController(IMapper mapper, IMediator mediator) : ControllerBase
{
    [HttpGet("{id:length(24)}", Name = "GetUser")]
    public async Task<IActionResult> Get(string id)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
        if (userId != id) return Unauthorized();

        var user = await mediator.Send(new GetUserById
        {
            UserId = id
        });

        if (user == null) return NotFound();

        var userForReturn = mapper.Map<UserForDetailDto>(user);

        return Ok(userForReturn);
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
        if (userId != id) return Unauthorized();

        var user = await mediator.Send(new GetUserById
        {
            UserId = id
        });
        if (user == null) return NotFound();

        await mediator.Send(new DeleteUser
        {
            User = user
        });

        return NoContent();
    }
}