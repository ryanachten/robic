using AutoMapper;
using Robic.Service.Models;
using Robic.Service.Models.DTOs.Exercise;
using Robic.Service.Models.DTOs.ExerciseDefinition;
using Robic.Service.Models.DTOs.User;
using Robic.Service.Models.Enums;
using System;
using RepositoryEnums = Robic.Repository.Models.Enums;
using RepositoryModel = Robic.Repository.Models;

namespace Robic.Service.Helpers;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        // Repository -> Service mappings
        CreateMap<RepositoryModel.User, User>();
        CreateMap<RepositoryModel.User, UserDetailDto>();
        CreateMap<RepositoryModel.ExerciseDefinition, ExerciseDefinition>();
        CreateMap<RepositoryModel.ExerciseDefinitionSummary, ExerciseDefinitionSummary>();
        CreateMap<RepositoryModel.Exercise, Exercise>();
        CreateMap<RepositoryModel.ExerciseSet, Set>()
            .ForMember(
                dest => dest.Value,
                opt => opt.MapFrom(src => Math.Round(src.Value, 2))
            );
        CreateMap<RepositoryModel.PersonalBestMaxValues, PersonalBest>()
            .ForMember(
                dest => dest.TopAvgValue,
                opt => opt.MapFrom<double?>(
                    src => src.TopAvgValue.HasValue ? Math.Round(src.TopAvgValue.Value, 2) : null
                ));
        CreateMap<RepositoryModel.ExerciseHistoryItem, ExerciseHistoryItem>();
        CreateMap<RepositoryModel.AnalyticsItem, AnalyticsItem>();

        // Service -> Repository mappings
        CreateMap<Set, RepositoryModel.DTOs.Exercise.CreateExerciseSetDto>();
        CreateMap<RegisterUserDto, User>();
        CreateMap<User, UserDetailDto>();
        CreateMap<UpdateExerciseDefinitionDto, RepositoryModel.ExerciseDefinition>();
        CreateMap<UpdateExerciseDto, RepositoryModel.DTOs.Exercise.UpdateExerciseDto>();
        CreateMap<UpdateExerciseDto, Exercise>()
        .ForMember(
            dest => dest.Sets,
            opt => opt.MapFrom(src => src.Sets)
        );

        // Service enum -> Repository enum mappings
        CreateMap<SortDirection, RepositoryEnums.SortDirection>();
        CreateMap<ExerciseDefinitionSortField, RepositoryEnums.ExerciseDefinitionSortField>();
        CreateMap<MuscleGroup, RepositoryEnums.MuscleGroup>();
        CreateMap<Unit, RepositoryEnums.Unit>();
    }

    public static IMapper CreateMapper()
    {
        return new MapperConfiguration(
            x => x.AddProfile(new AutoMapperProfile())
        ).CreateMapper();
    }
}