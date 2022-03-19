using System.Threading.Tasks;
using RobicServer.Models;

namespace RobicServer.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly IMongoRepository<User> _userContext;
        private readonly IMongoRepository<Exercise> _exerciseContext;
        private readonly IMongoRepository<ExerciseDefinition> _exerciseDefinitionContext;

        public UserRepository(IMongoRepository<User> userContext, IMongoRepository<Exercise> exerciseContext,
            IMongoRepository<ExerciseDefinition> exerciseDefinitionContext)
        {
            _userContext = userContext;
            _exerciseContext = exerciseContext;
            _exerciseDefinitionContext = exerciseDefinitionContext;
        }

        public async Task DeleteUser(User user)
        {
            // Clean up associated user data
            foreach (var definitionId in user.Exercises)
            {
                var definiton = await _exerciseDefinitionContext.FindByIdAsync(definitionId);
                foreach (var exerciseId in definiton.History)
                {
                    // Remove all associated exercise sesssions
                    await _exerciseContext.DeleteByIdAsync(exerciseId);
                }
                // Remove all associated exercise definitions
                await _exerciseDefinitionContext.DeleteByIdAsync(definitionId);
            }

            await _userContext.DeleteByIdAsync(user.Id);
        }

        public async Task<User> GetUser(string id)
        {
            return await _userContext.FindByIdAsync(id);
        }
    }
}