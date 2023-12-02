using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using RobicServer.Command;
using RobicServer.Models;
using RobicServer.Models.DTOs;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace RobicServer.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController(IMapper mapper, IMediator mediator) : ControllerBase
{
    [HttpPost("register")]
    public async Task<IActionResult> Register(UserForRegisterDto userDetails)
    {
        var userToRegister = mapper.Map<User>(userDetails);
        try
        {
            var registeredUser = await mediator.Send(new RegisterUser
            {
                User = userToRegister,
                Password = userDetails.Password
            });
            var userForReturn = mapper.Map<UserForDetailDto>(registeredUser);

            return CreatedAtRoute("GetUser", new { controller = "User", id = registeredUser.Id }, userForReturn);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(UserForLoginDto userLoginDetails)
    {
        var user = await mediator.Send(new LoginUser
        {
            Email = userLoginDetails.Email,
            Password = userLoginDetails.Password
        });
        if (user == null)
            return Unauthorized();

        var userDetails = mapper.Map<UserForDetailDto>(user);

        return Ok(new
        {
            token = GenerateToken(user),
            userDetails
        });
    }

    private string GenerateToken(User user)
    {
        var claims = new[]{
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(ClaimTypes.Email, user.Email),
        };

        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("TokenKey"))
        );

        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.Now.AddYears(1),
            SigningCredentials = credentials
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }
}