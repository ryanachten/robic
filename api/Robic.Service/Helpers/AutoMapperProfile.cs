using AutoMapper;
using Robic.Service.Models;
using Robic.Service.Models.DTOs.Exercise;
using Robic.Service.Models.DTOs.ExerciseDefinition;
using Robic.Service.Models.DTOs.User;
using Robic.Service.Models.Enums;
using RepositoryEnums = Robic.Repository.Models.Enums;
using RepositoryModel = Robic.Repository.Models;

namespace Robic.Service.Helpers;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<RepositoryModel.User, User>();
        CreateMap<RepositoryModel.User, UserDetailDto>();
        CreateMap<RepositoryModel.ExerciseDefinition, ExerciseDefinition>();
        CreateMap<RepositoryModel.ExerciseDefinition, ExerciseDefinition>();
        CreateMap<RepositoryModel.ExerciseDefinitionSummary, ExerciseDefinitionSummary>();
        CreateMap<RepositoryModel.Exercise, Exercise>();
        CreateMap<RepositoryModel.ExerciseSet, Set>();
        CreateMap<RepositoryModel.PersonalBestMaxValues, PersonalBest>();
        CreateMap<RepositoryModel.ExerciseHistoryItem, ExerciseHistoryItem>();
        CreateMap<RepositoryModel.AnalyticsItem, AnalyticsItem>();
        CreateMap<Set, RepositoryModel.DTOs.Exercise.CreateExerciseSetDto>();
        CreateMap<RegisterUserDto, User>();
        CreateMap<User, UserDetailDto>();
        CreateMap<UpdateExerciseDefinitionDto, RepositoryModel.ExerciseDefinition>();
        CreateMap<UpdateExerciseDto, RepositoryModel.DTOs.Exercise.UpdateExerciseDto>();
        CreateMap<SortDirection, RepositoryEnums.SortDirection>();
        CreateMap<ExerciseDefinitionSortField, RepositoryEnums.ExerciseDefinitionSortField>();
        CreateMap<MuscleGroup, RepositoryEnums.MuscleGroup>();
        CreateMap<Unit, RepositoryEnums.Unit>();
        CreateMap<UpdateExerciseDto, Exercise>()
            .ForMember(
                dest => dest.Sets,
                opt => opt.MapFrom(src => src.Sets)
            );
    }

    public static IMapper CreateMapper()
    {
        return new MapperConfiguration(
            x => x.AddProfile(new AutoMapperProfile())
        ).CreateMapper();
    }
}