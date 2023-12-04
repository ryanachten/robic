using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using RobicServer.Command;
using RobicServer.Models.DTOs.User;
using RobicServer.Query;
using System.Threading.Tasks;

namespace RobicServer.Controllers;

public class UserController(IMapper mapper, IMediator mediator) : BaseController
{
    [HttpGet("{id:length(24)}", Name = "GetUser")]
    public async Task<IActionResult> Get(string id)
    {
        if (UserId != id) return Unauthorized();

        var user = await mediator.Send(new GetUserById
        {
            UserId = id
        });

        if (user == null) return NotFound();

        var userForReturn = mapper.Map<UserDetailDto>(user);

        return Ok(userForReturn);
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        if (UserId != id) return Unauthorized();

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