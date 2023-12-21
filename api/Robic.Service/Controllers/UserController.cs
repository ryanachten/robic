using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Robic.Service.Command;
using Robic.Service.Models.DTOs.User;
using Robic.Service.Query;
using System.Threading.Tasks;

namespace Robic.Service.Controllers;

public class UserController(IMapper mapper, IMediator mediator) : BaseController
{
    [HttpGet("{id}", Name = "GetUser")]
    public async Task<IActionResult> Get(int id)
    {
        if (GetUserId() != id) return Unauthorized();

        var user = await mediator.Send(new GetUserById
        {
            UserId = id
        });

        if (user == null) return NotFound();

        var userForReturn = mapper.Map<UserDetailDto>(user);

        return Ok(userForReturn);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        if (GetUserId() != id) return Unauthorized();

        var user = await mediator.Send(new GetUserById
        {
            UserId = id
        });
        if (user == null) return NotFound();

        await mediator.Send(new DeleteUserById
        {
            UserId = id
        });

        return NoContent();
    }
}