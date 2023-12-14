using Dapper;
using MySqlConnector;
using Robic.Repository.Models;
using Robic.Repository.Models.DTOs.ExerciseDefinition;

namespace Robic.Repository;

public class ExerciseDefinitionRepository(MySqlDataSource database) : IExerciseDefinitionRepository
{
    public async Task CreateDefinition(CreateExerciseDefinitionDto createExerciseDefinition)
    {
        using var connection = await database.OpenConnectionAsync();

        var sql = @"
            INSERT INTO ExerciseDefinitions (Title, Unit, UserId)
            VALUES (@Title, @Unit, @UserId);
        ";
        await connection.ExecuteAsync(sql, createExerciseDefinition);
    }

    public async Task<ExerciseDefinition?> GetDefinitionById(int exerciseDefinitionId)
    {
        using var connection = await database.OpenConnectionAsync();

        var sql = @"
            SELECT Id, Title, Unit, UserId
            FROM ExerciseDefinitions
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
            FROM ExerciseDefinitions
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
            FROM ExerciseDefinitions
            WHERE UserId = @userId;
        ";
        return await connection.QueryAsync<ExerciseDefinition>(sql, new
        {
            userId
        });
    }
}
