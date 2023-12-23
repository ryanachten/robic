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

    public async Task<IEnumerable<ExerciseDefinitionSummary>> GetDefinitionSummaries(int userId)
    {
        using var connection = await database.OpenConnectionAsync();

        var sql = @"
            SELECT 
                D.Id as Id,
                D.Title as Title,
                COUNT(E.Id) as SessionCount,
                MAX(E.Date) as LastSessionDate,
                -- get latest improvement by comparing the net value of the last two exercise sessions
                (
                    SELECT 
                        (latest.NetValue - previous.NetValue) / previous.NetValue * 100 AS ImprovementPercentage
                    FROM (
                        SELECT 
                            Exercise.Id AS ExerciseId,
                            SUM(ExerciseSet.Reps * ExerciseSet.Value) AS NetValue
                        FROM Exercise
                        JOIN ExerciseSet ON Exercise.Id = ExerciseSet.ExerciseId
                        WHERE Exercise.DefinitionId = D.Id
                        GROUP BY Exercise.Id
                        ORDER BY Exercise.Date DESC
                        LIMIT 2
                    ) AS latest
                    JOIN (
                        SELECT 
                            Exercise.Id AS ExerciseId,
                            SUM(ExerciseSet.Reps * ExerciseSet.Value) AS NetValue
                        FROM Exercise
                        JOIN ExerciseSet ON Exercise.Id = ExerciseSet.ExerciseId
                        WHERE Exercise.DefinitionId = D.Id
                        GROUP BY Exercise.Id
                        ORDER BY Exercise.Date DESC
                        LIMIT 2, 1
                    ) AS previous ON latest.ExerciseId <> previous.ExerciseId
                ) as LastImprovement
            FROM ExerciseDefinition as D
            LEFT JOIN Exercise AS E ON D.Id = E.DefinitionId
            WHERE D.UserId = @userId
            GROUP BY D.Id
            ORDER BY D.Title;
        ";
        return await connection.QueryAsync<ExerciseDefinitionSummary>(sql, new
        {
            userId
        });
    }
}
