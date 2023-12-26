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
    /// <summary>
    /// Retrieves a user
    /// </summary>
    [HttpGet("{id}", Name = "GetUser")]
    public async Task<IActionResult> GetUser(int id)
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

    /// <summary>
    /// Deletes a user and associated resources
    /// </summary>
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(int id)
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