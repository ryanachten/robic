using AutoMapper;
using MediatR;
using Robic.Repository;
using Robic.Service.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Robic.Service.Query;

public class GetUserAnalyticsHandler(
    IExerciseMuscleGroupRepository exerciseMuscleGroupRepository,
    IExerciseDefinitionRepository exerciseDefinitionRepository,
    IMapper mapper) : IRequestHandler<GetUserAnalytics, UserAnalytics>
{
    public async Task<UserAnalytics> Handle(GetUserAnalytics request, CancellationToken cancellationToken)
    {
        var muscleGroupFrequenciesResponse = exerciseMuscleGroupRepository.GetMuscleGroupFrequencies(request.UserId);
        var definitionFrequenciesResponse = exerciseDefinitionRepository.GetDefinitionFrequencies(request.UserId, request.MaxResults);
        var definitionProgressResponse = exerciseDefinitionRepository.GetDefinitionProgress(request.UserId, request.MaxResults);

        await Task.WhenAll(
            muscleGroupFrequenciesResponse,
            definitionFrequenciesResponse,
            definitionProgressResponse
        );

        var muscleGroupFrequencies = mapper.Map<List<AnalyticsItem>>(muscleGroupFrequenciesResponse.Result);
        var definitionFrequencies = mapper.Map<List<AnalyticsItem>>(definitionFrequenciesResponse.Result);
        var definitionProgress = mapper.Map<List<AnalyticsItem>>(definitionProgressResponse.Result);

        return new UserAnalytics()
        {
            MostFrequentMuscleGroup = muscleGroupFrequencies.FirstOrDefault(),
            MuscleGroupFrequency = muscleGroupFrequencies,
            MostFrequentExercise = definitionFrequencies.FirstOrDefault(),
            ExerciseFrequency = definitionFrequencies,
            MostExerciseProgress = definitionProgress.FirstOrDefault(),
            ExerciseProgress = definitionProgress
        };
    }
}