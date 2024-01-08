using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Robic.Service.Command;
using Robic.Service.Models;
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
        if (UserId != id) return Unauthorized();

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
        if (UserId != id) return Unauthorized();

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

    /// <summary>
    /// Returns exercise analytics for a given user
    /// </summary>
    /// <param name="maxResults">Number of results to return for each analytics list</param>
    /// <returns>User analytics</returns>
    [HttpGet("analytics")]
    [ProducesResponseType(typeof(UserAnalytics), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetUserAnalytics([FromQuery] int maxResults)
    {
        var analytics = await mediator.Send(new GetUserAnalytics
        {
            UserId = UserId,
            MaxResults = maxResults
        });

        return Ok(analytics);
    }
}