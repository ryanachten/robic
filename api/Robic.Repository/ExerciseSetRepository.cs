using Dapper;
using MySqlConnector;
using Robic.Repository.Models;
using Robic.Repository.Models.DTOs.Exercise;

namespace Robic.Repository;

public class ExerciseSetRepository(MySqlDataSource database) : IExerciseSetRepository
{
    public async Task CreateSet(int exerciseId, int definitionId, IEnumerable<CreateExerciseSetDto> sets)
    {
        var updatedSets = sets.Select((CreateExerciseSetDto set, int i) =>
            new ExerciseSet()
            {
                ExerciseId = exerciseId,
                DefinitionId = definitionId,
                SetOrder = i,
                Reps = set.Reps,
                Value = set.Value
            });

        using var connection = await database.OpenConnectionAsync();

        var sql = @"
            INSERT INTO ExerciseSet (ExerciseId, DefinitionId, SetOrder, Reps, Value)
            VALUES (@ExerciseId, @DefinitionId, @SetOrder, @Reps, @Value);
        ";

        await connection.ExecuteAsync(sql, updatedSets);
    }

    public async Task DeleteExerciseSets(int exerciseId)
    {
        using var connection = await database.OpenConnectionAsync();

        var sql = @"
            DELETE FROM ExerciseSet 
            WHERE ExerciseId = @exerciseId;
        ";

        await connection.ExecuteAsync(sql, new
        {
            exerciseId
        });
    }

    public async Task<IEnumerable<ExerciseSet>> GetExerciseSets(int exerciseId)
    {
        using var connection = await database.OpenConnectionAsync();

        var sql = @"
            SELECT Id, ExerciseId, DefinitionId, SetOrder, Reps, Value
            FROM ExerciseSet
            WHERE ExerciseId = @exerciseId
            ORDER BY SetOrder;
        ";
        return await connection.QueryAsync<ExerciseSet>(sql, new
        {
            exerciseId,
        });
    }

    public async Task<IEnumerable<ExerciseSet>> GetExerciseSets(IEnumerable<int> exerciseIds)
    {
        using var connection = await database.OpenConnectionAsync();

        var sql = @"
            SELECT Id, ExerciseId, DefinitionId, SetOrder, Reps, Value
            FROM ExerciseSet
            WHERE ExerciseId IN @exerciseIds
            ORDER BY SetOrder;
        ";
        return await connection.QueryAsync<ExerciseSet>(sql, new
        {
            exerciseIds,
        });
    }

    public async Task<IEnumerable<ExerciseSet>> GetPersonalBestSets(int definitionId)
    {
        using var connection = await database.OpenConnectionAsync();

        var sql = @"
            SELECT Id, ExerciseId, SetOrder, Reps, Value
            FROM ExerciseSet
            WHERE ExerciseId = (
                SELECT ExerciseId
                FROM ExerciseSet
                WHERE DefinitionId = @definitionId
                GROUP BY ExerciseId
                ORDER BY SUM(Reps * Value) DESC, ExerciseId DESC
                LIMIT 1
            );
        ";
        return await connection.QueryAsync<ExerciseSet>(sql, new
        {
            definitionId
        });
    }
}
