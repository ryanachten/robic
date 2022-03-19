using AutoMapper;
using RobicServer.Models;
using RobicServer.Models.DTOs;

namespace RobicServer.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<UserForRegisterDto, User>();
            CreateMap<User, UserForDetailDto>();
            CreateMap<ExerciseDefinition, ExerciseDefinitionForListDto>();
        }
    }
}