using AutoMapper;
using Robic.Service.Models;
using Robic.Service.Models.DTOs.Exercise;
using Robic.Service.Models.DTOs.ExerciseDefinition;
using Robic.Service.Models.DTOs.User;
using RepositoryModel = Robic.Repository.Models;

namespace Robic.Service.Helpers;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<RepositoryModel.User, User>();
        CreateMap<RepositoryModel.User, UserDetailDto>();
        CreateMap<RepositoryModel.ExerciseDefinition, ExerciseDefinition>()
            .ForMember(
                dest => dest.User,
                opt => opt.MapFrom(src => src.UserId)
            );
        CreateMap<RepositoryModel.ExerciseDefinition, ListExerciseDefinitionDto>();
        CreateMap<RegisterUserDto, User>();
        CreateMap<User, UserDetailDto>();
        CreateMap<UpdateExerciseDefinitionDto, ExerciseDefinition>();
        CreateMap<UpdateExerciseDto, Exercise>()
            .ForMember(
                dest => dest.Sets,
                opt => opt.MapFrom(src => src.Sets)
            );
        CreateMap<UpdateSetDto, Set>();
    }

    public static IMapper CreateMapper()
    {
        return new MapperConfiguration(
            x => x.AddProfile(new AutoMapperProfile())
        ).CreateMapper();
    }
}