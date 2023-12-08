using AutoMapper;
using RobicServer.Models;
using RobicServer.Models.DTOs.Exercise;
using RobicServer.Models.DTOs.ExerciseDefinition;
using RobicServer.Models.DTOs.User;

namespace RobicServer.Helpers;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<RegisterUserDto, User>();
        CreateMap<User, UserDetailDto>();
        CreateMap<ExerciseDefinition, ListExerciseDefinitionDto>();
        CreateMap<UpdateExerciseDefinitionDto, ExerciseDefinition>();
        CreateMap<UpdateExerciseDto, Exercise>()
            .ForMember(
                dest => dest.Sets,
                opt => opt.MapFrom(src => src.Sets)
            );
        CreateMap<UpdateSetDto, Set>();
    }
}