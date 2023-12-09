using AutoMapper;
using Robic.Service.Models;
using Robic.Service.Models.DTOs.Exercise;
using Robic.Service.Models.DTOs.ExerciseDefinition;
using Robic.Service.Models.DTOs.User;
using RepositoryModel = Robic.Repository.Models;

namespace Robic.Service.Helpers;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<RepositoryModel.User, User>();
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