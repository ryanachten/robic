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

    public async Task<Exercise?> GetLatestDefinitionExercise(int definitionId)
    {
        using var connection = await database.OpenConnectionAsync();

        var sql = @"
            SELECT Id, DefinitionId, Date, TimeTaken
            FROM Exercise
            WHERE DefinitionId = @definitionId
            ORDER BY Date DESC
            LIMIT 1;
        ";
        return await connection.QueryFirstOrDefaultAsync<Exercise?>(sql, new
        {
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

    public async Task<IEnumerable<ExerciseHistoryItem>> GetExerciseHistory(int definitionId)
    {
        using var connection = await database.OpenConnectionAsync();

        var sql = @"
            SELECT 
                E.Date as Date,
                E.TimeTaken as TimeTaken,
                SUM(S.Reps * S.Value) AS NetValue,
                SUM(S.Value) / COUNT(S.Id) AS AvgValue,
                SUM(S.Reps) / COUNT(S.Id) AS AvgReps,
                COUNT(S.Id) as Sets
            FROM Exercise as E
            JOIN ExerciseSet AS S ON E.Id = S.ExerciseId
            WHERE E.DefinitionId = @definitionId
            GROUP BY ExerciseId
            ORDER BY E.Date DESC;
        ";

        return await connection.QueryAsync<ExerciseHistoryItem>(sql, new
        {
            definitionId
        });
    }
}
