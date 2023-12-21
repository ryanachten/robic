using Dapper;
using MySqlConnector;
using Robic.Repository.Models;
using Robic.Repository.Models.DTOs.Exercise;

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

        var insertedId = await connection.QueryFirstAsync<int>(sql, exercise);
        exercise.Id = insertedId;

        return exercise;
    }

    public async Task DeleteExerciseById(int id)
    {
        using var connection = await database.OpenConnectionAsync();

        var sql = @"
            DELETE FROM Exercise
            WHERE Id = @Id;
        ";
        await connection.ExecuteAsync(sql, new
        {
            id
        });
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
        return await connection.QueryFirstOrDefaultAsync<Exercise>(sql, new
        {
            id
        });
    }

    public async Task UpdateExercise(int id, UpdateExerciseDto updatedExercise)
    {
        using var connection = await database.OpenConnectionAsync();

        var sql = @"
            UPDATE Exercise
            SET TimeTaken = @TimeTaken
            WHERE Id = @Id;
        ";

        await connection.ExecuteAsync(sql, new
        {
            Id = id,
            updatedExercise.TimeTaken,
        });
    }
}
