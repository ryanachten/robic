using RobicServer.Models;
using System.Threading.Tasks;

namespace RobicServer.Data;

public class UserRepository(
    IMongoRepository<User> userContext,
    IMongoRepository<Exercise> exerciseContext,
    IMongoRepository<ExerciseDefinition> exerciseDefinitionContext
) : IUserRepository
{
    public async Task DeleteUser(User user)
    {
        // Clean up associated user data
        foreach (var definitionId in user.Exercises)
        {
            var definiton = await exerciseDefinitionContext.FindByIdAsync(definitionId);
            foreach (var exerciseId in definiton.History)
            {
                // Remove all associated exercise sesssions
                await exerciseContext.DeleteByIdAsync(exerciseId);
            }
            // Remove all associated exercise definitions
            await exerciseDefinitionContext.DeleteByIdAsync(definitionId);
        }

        await userContext.DeleteByIdAsync(user.Id);
    }

    public async Task<User> GetUser(string id)
    {
        return await userContext.FindByIdAsync(id);
    }
}