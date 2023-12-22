using Dapper;
using MySqlConnector;

namespace Robic.Repository;

public class ExerciseMuscleGroupRepository(MySqlDataSource database) : IExerciseMuscleGroupRepository
{
    public async Task AddDefinitionMuscleGroups(int definitionId, IEnumerable<string> primaryMuscleGroups)
    {
        var insertStatements = primaryMuscleGroups.Select(muscleCode => new
        {
            definitionId,
            muscleCode
        });

        using var connection = await database.OpenConnectionAsync();

        var sql = @"
            INSERT INTO ExerciseMuscleGroup (MuscleCode, DefinitionId)
            VALUES (@muscleCode, @definitionId);
        ";

        await connection.ExecuteAsync(sql, insertStatements);
    }

    public async Task<IEnumerable<string>> GetDefinitionMuscleGroups(int definitionId)
    {
        using var connection = await database.OpenConnectionAsync();

        var sql = @"
            SELECT MuscleCode FROM ExerciseMuscleGroup
            WHERE DefinitionId = @definitionId;
        ";

        return await connection.QueryAsync<string>(sql, new
        {
            definitionId
        });
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
}
