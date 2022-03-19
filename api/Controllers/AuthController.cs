using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using RobicServer.Models;
using RobicServer.Models.DTOs;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Configuration;
using System;
using System.IdentityModel.Tokens.Jwt;
using MediatR;
using RobicServer.Command;

namespace RobicServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;

        public AuthController(
            IMapper mapper,
            IConfiguration config,
            IMediator mediator
        )
        {
            _config = config;
            _mapper = mapper;
            _mediator = mediator;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userDetails)
        {
            User userToRegister = _mapper.Map<User>(userDetails);
            try
            {
                var registeredUser = await _mediator.Send(new RegisterUser
                {
                    User = userToRegister,
                    Password = userDetails.Password
                });
                var userForReturn = _mapper.Map<UserForDetailDto>(registeredUser);

                return CreatedAtRoute("GetUser", new { controller = "User", id = registeredUser.Id }, userForReturn);
            }
            catch (System.Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userLoginDetails)
        {
            var user = await _mediator.Send(new LoginUser
            {
                Email = userLoginDetails.Email,
                Password = userLoginDetails.Password
            });
            if (user == null)
                return Unauthorized();

            var userDetails = _mapper.Map<UserForDetailDto>(user);

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
}