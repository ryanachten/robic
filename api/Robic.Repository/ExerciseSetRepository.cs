using Dapper;
using MySqlConnector;
using Robic.Repository.Models;

namespace Robic.Repository;

public class ExerciseSetRepository(MySqlDataSource database) : IExerciseSetRepository
{
    public async Task CreateSet(IEnumerable<ExerciseSet> set)
    {
        using var connection = await database.OpenConnectionAsync();

        var sql = @"
            INSERT INTO ExerciseSet (ExerciseId, SetOrder, Reps, Value)
            VALUES (@ExerciseId, @SetOrder, @Reps, @Value);
        ";

        await connection.ExecuteAsync(sql, set);
    }

    public async Task<IEnumerable<ExerciseSet>> GetExerciseSets(int exerciseId)
    {
        using var connection = await database.OpenConnectionAsync();

        var sql = @"
            SELECT Id, ExerciseId, SetOrder, Reps, Value
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
            SELECT Id, ExerciseId, SetOrder, Reps, Value
            FROM ExerciseSet
            WHERE ExerciseId IN @exerciseIds
            ORDER BY SetOrder;
        ";
        return await connection.QueryAsync<ExerciseSet>(sql, new
        {
            exerciseIds,
        });
    }
}
