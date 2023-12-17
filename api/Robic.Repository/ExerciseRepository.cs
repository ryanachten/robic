using Dapper;
using MySqlConnector;
using Robic.Repository.Models;

namespace Robic.Repository;

public class ExerciseRepository(MySqlDataSource database) : IExerciseRepository
{
    public async Task<Exercise> CreateExercise(Exercise exercise)
    {
        using var connection = await database.OpenConnectionAsync();

        var sql = @"
            INSERT INTO Exercise (DefinitionId, UserId, Date, TimeTaken)
            VALUES (@DefinitionId, @UserId, @Date, @TimeTaken);
            SELECT LAST_INSERT_ID();
        ";

        var insertedId = await connection.QueryAsync<int>(sql, exercise);
        exercise.Id = insertedId.First();

        return exercise;
    }

    public Task DeleteExerciseById(int id)
    {
        throw new NotImplementedException();
    }

    public async Task<IEnumerable<Exercise>> GetDefinitionExercises(int userId, int definitionId)
    {
        using var connection = await database.OpenConnectionAsync();

        var sql = @"
            SELECT Id, DefinitionId, Date, TimeTaken
            FROM Exercise
            WHERE UserId = @userId AND DefinitionId = @definitionId;
        ";
        return await connection.QueryAsync<Exercise>(sql, new
        {
            userId,
            definitionId
        });
    }

    public async Task<Exercise?> GetExerciseById(int id)
    {
        using var connection = await database.OpenConnectionAsync();

        var sql = @"
            SELECT Id, DefinitionId, Date, TimeTaken
            FROM Exercise
            WHERE Id = @id;
        ";
        var results = await connection.QueryAsync<Exercise>(sql, new
        {
            id
        });
        return results.FirstOrDefault();
    }

    public Task UpdateExercise(int id, Exercise updatedExercise)
    {
        throw new NotImplementedException();
    }
}
