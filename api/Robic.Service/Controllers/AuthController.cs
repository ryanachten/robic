using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Robic.Service.Command;
using Robic.Service.Models;
using Robic.Service.Models.DTOs.User;
using System;
using System.Threading.Tasks;

namespace Robic.Service.Controllers;

[Route("api/[controller]")]
[ApiController]
[Produces("application/json")]
public class AuthController(IMapper mapper, IMediator mediator) : ControllerBase
{
    /// <summary>
    /// Registers a new user
    /// </summary>
    [HttpPost("register")]
    [ProducesResponseType(typeof(UserDetailDto), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Register(RegisterUserDto userDetails)
    {
        var userToRegister = mapper.Map<User>(userDetails);
        try
        {
            var registeredUser = await mediator.Send(new RegisterUser
            {
                User = userToRegister,
                Password = userDetails.Password
            });
            var userForReturn = mapper.Map<UserDetailDto>(registeredUser);

            return CreatedAtRoute("GetUser", new { controller = "User", id = registeredUser.Id }, userForReturn);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    /// <summary>
    /// Logs a user in
    /// </summary>
    [HttpPost("login")]
    [ProducesResponseType(typeof(LoginResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> Login(LoginUserDto userLoginDetails)
    {
        var loginResponse = await mediator.Send(new LoginUser
        {
            Email = userLoginDetails.Email,
            Password = userLoginDetails.Password
        });

        if (loginResponse == null) return Unauthorized("Username or password is incorrect");

        return Ok(loginResponse);
    }
}