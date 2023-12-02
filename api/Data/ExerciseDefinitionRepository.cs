using RobicServer.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RobicServer.Data;

public class ExerciseDefinitionRepository(
    IMongoRepository<ExerciseDefinition> exerciseDefinitionContext,
    IMongoRepository<Exercise> exerciseContext,
    IMongoRepository<User> userContext
) : IExerciseDefinitionRepository
{
    public async Task<ExerciseDefinition> CreateDefinition(string userId, ExerciseDefinition definition)
    {
        await exerciseDefinitionContext.InsertOneAsync(definition);

        // Update user's exercises with new exercise
        User user = await userContext.FindByIdAsync(userId);
        user.Exercises.Add(definition.Id);
        await userContext.ReplaceOneAsync(user);
        return definition;
    }

    public async Task DeleteDefinition(ExerciseDefinition definition)
    {
        await exerciseDefinitionContext.DeleteByIdAsync(definition.Id);

        // Remove definition from user exercises
        User user = await userContext.FindByIdAsync(definition.User);
        user.Exercises.Remove(definition.Id);
        await userContext.ReplaceOneAsync(user);

        // Remove exercises associated with definition
        await exerciseContext.DeleteManyAsync(e => e.Definition == definition.Id);
    }

    public async Task<ExerciseDefinition> GetExerciseDefinition(string id)
    {
        return await exerciseDefinitionContext.FindByIdAsync(id);
    }

    public Task<IEnumerable<ExerciseDefinition>> GetUserDefinitions(string userId)
    {
        return exerciseDefinitionContext.FilterByAsync(defintion => defintion.User == userId);
    }

    public async Task<ExerciseDefinition> UpdateDefinition(ExerciseDefinition existingDefinition, ExerciseDefinition updatedDefinition)
    {
        existingDefinition.Title = updatedDefinition.Title;
        existingDefinition.Unit = updatedDefinition.Unit;
        existingDefinition.PrimaryMuscleGroup = updatedDefinition.PrimaryMuscleGroup;

        await exerciseDefinitionContext.ReplaceOneAsync(existingDefinition);

        return existingDefinition;
    }
}