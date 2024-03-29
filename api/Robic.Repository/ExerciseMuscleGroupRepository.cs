﻿using Dapper;
using MySqlConnector;
using Robic.Repository.Models;
using Robic.Repository.Models.Enums;

namespace Robic.Repository;

public class ExerciseMuscleGroupRepository(MySqlDataSource database) : IExerciseMuscleGroupRepository
{
    public async Task AddDefinitionMuscleGroups(int definitionId, IEnumerable<MuscleGroup> primaryMuscleGroups)
    {
        var insertStatements = primaryMuscleGroups.Select(muscleCode => new
        {
            definitionId,
            muscleCode = muscleCode.ToString(),
        });

        using var connection = await database.OpenConnectionAsync();

        var sql = @"
            INSERT INTO ExerciseMuscleGroup (MuscleCode, DefinitionId)
            VALUES (@muscleCode, @definitionId);
        ";

        await connection.ExecuteAsync(sql, insertStatements);
    }

    public async Task<IEnumerable<MuscleGroup>> GetDefinitionMuscleGroups(int definitionId)
    {
        using var connection = await database.OpenConnectionAsync();

        var sql = @"
            SELECT MuscleCode FROM ExerciseMuscleGroup
            WHERE DefinitionId = @definitionId;
        ";

        var results = await connection.QueryAsync<string>(sql, new
        {
            definitionId
        });

        return results.Select(mg => Enum.Parse<MuscleGroup>(mg));
    }

    public async Task DeleteDefinitionMuscleGroups(int definitionId)
    {
        using var connection = await database.OpenConnectionAsync();

        var sql = @"
            DELETE FROM ExerciseMuscleGroup
            WHERE DefinitionId = @definitionId;
        ";

        await connection.ExecuteAsync(sql, new
        {
            definitionId
        });
    }

    public async Task<IEnumerable<AnalyticsItem>> GetMuscleGroupFrequencies(int userId)
    {
        using var connection = await database.OpenConnectionAsync();

        var sql = @"
            SELECT 
                M.MuscleCode as Marker,
                COUNT(E.Id) as Count
            FROM ExerciseMuscleGroup as M
            JOIN Exercise as E on M.DefinitionId = E.DefinitionId
            JOIN ExerciseDefinition as D on E.DefinitionId = D.Id
            WHERE D.UserId = @userId
            GROUP BY Marker
            ORDER BY Count DESC, Marker;
        ";

        return await connection.QueryAsync<AnalyticsItem>(sql, new
        {
            userId
        });
    }
}
