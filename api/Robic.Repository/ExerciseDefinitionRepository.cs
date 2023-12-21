using Dapper;
using MySqlConnector;
using Robic.Repository.Models;
using Robic.Repository.Models.DTOs.ExerciseDefinition;

namespace Robic.Repository;

public class ExerciseDefinitionRepository(MySqlDataSource database) : IExerciseDefinitionRepository
{
    public async Task<ExerciseDefinition?> GetDefinitionById(int exerciseDefinitionId)
    {
        using var connection = await database.OpenConnectionAsync();

        var sql = @"
            SELECT Id, Title, Unit, UserId
            FROM ExerciseDefinition
            WHERE Id = @exerciseDefinitionId;
        ";
        var definitions = await connection.QueryAsync<ExerciseDefinition>(sql, new
        {
            exerciseDefinitionId
        });

        return definitions.FirstOrDefault();
    }


    public async Task<ExerciseDefinition?> GetDefinitionByTitle(int userId, string title)
    {
        using var connection = await database.OpenConnectionAsync();

        var sql = @"
            SELECT Id, Title, Unit, UserId
            FROM ExerciseDefinition
            WHERE Title = @title AND UserId = @userId;
        ";
        var definitions = await connection.QueryAsync<ExerciseDefinition>(sql, new
        {
            title,
            userId
        });

        return definitions.FirstOrDefault();
    }

    public async Task<IEnumerable<ExerciseDefinition>?> GetUserDefinitions(int userId)
    {
        using var connection = await database.OpenConnectionAsync();

        var sql = @"
            SELECT Id, Title, Unit, UserId
            FROM ExerciseDefinition
            WHERE UserId = @userId;
        ";
        return await connection.QueryAsync<ExerciseDefinition>(sql, new
        {
            userId
        });
    }

    public async Task<ExerciseDefinition> CreateDefinition(ExerciseDefinition exerciseDefinition)
    {
        using var connection = await database.OpenConnectionAsync();

        var sql = @"
            INSERT INTO ExerciseDefinition (Title, Unit, UserId)
            VALUES (@Title, @Unit, @UserId);
            SELECT LAST_INSERT_ID();
        ";
        var insertedId = await connection.QueryFirstAsync<int>(sql, exerciseDefinition);
        exerciseDefinition.Id = insertedId;

        return exerciseDefinition;
    }

    public async Task DeleteDefinitionById(int exerciseDefinitionId)
    {
        using var connection = await database.OpenConnectionAsync();

        var sql = @"
            DELETE FROM ExerciseDefinition
            WHERE Id = @exerciseDefinitionId;
        ";
        await connection.ExecuteAsync(sql, new
        {
            exerciseDefinitionId
        });
    }

    public async Task UpdateDefinition(UpdateExerciseDefinitionDto createExerciseDefinition)
    {
        using var connection = await database.OpenConnectionAsync();

        var sql = @"
            UPDATE ExerciseDefinition
            SET Title = @Title, Unit = @Unit
            WHERE Id = @Id;
        ";
        await connection.ExecuteAsync(sql, createExerciseDefinition);
    }
}
