using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Robic.Service.Command;
using Robic.Service.Models;
using Robic.Service.Models.DTOs.User;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
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
        var user = await mediator.Send(new LoginUser
        {
            Email = userLoginDetails.Email,
            Password = userLoginDetails.Password
        });
        if (user == null) return Unauthorized();

        var userDetails = mapper.Map<UserDetailDto>(user);

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

        var tokenKey = Environment.GetEnvironmentVariable("TokenKey");
        if (tokenKey == null) throw new UnauthorizedAccessException("Missing singing token key in environment configurtion");

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey));

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