using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Robic.Service.Command;
using Robic.Service.Models;
using Robic.Service.Models.DTOs.User;
using System;
using System.Threading.Tasks;

namespace Robic.Service.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController(IMapper mapper, IMediator mediator) : ControllerBase
{
    [HttpPost("register")]
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

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginUserDto userLoginDetails)
    {
        var loginResponse = await mediator.Send(new LoginUser
        {
            Email = userLoginDetails.Email,
            Password = userLoginDetails.Password
        });

        if (loginResponse == null) return Unauthorized();

        return Ok(loginResponse);
    }
}