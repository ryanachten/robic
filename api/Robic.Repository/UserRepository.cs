﻿using Dapper;
using MySqlConnector;
using Robic.Repository.Models;
using Robic.Repository.Models.DTOs.User;

namespace Robic.Repository;

public class UserRepository(MySqlDataSource database) : IUserRepository
{
    public async Task<int> CreateUser(RegisterUserDto registerUser)
    {
        using var connection = await database.OpenConnectionAsync();

        var sql = @"
            INSERT INTO User (FirstName, LastName, Email, PasswordHash, PasswordSalt)
            VALUES (@FirstName, @LastName, @Email, @PasswordHash, @PasswordSalt);
            SELECT LAST_INSERT_ID();
        ";
        var insertedId = await connection.QueryFirstAsync<int>(sql, registerUser);

        return insertedId;
    }

    public async Task<User?> GetUserByEmail(string email)
    {
        using var connection = await database.OpenConnectionAsync();

        var sql = @"
            SELECT Id, FirstName, LastName, Email, PasswordHash, PasswordSalt 
            FROM User 
            WHERE Email = @email;
        ";
        var users = await connection.QueryAsync<User>(sql, new
        {
            email,
        });

        return users.FirstOrDefault();
    }

    public async Task<User?> GetUserById(int userId)
    {
        using var connection = await database.OpenConnectionAsync();

        var sql = @"
            SELECT Id, FirstName, LastName, Email, PasswordHash, PasswordSalt 
            FROM User 
            WHERE Id = @userId;
        ";
        var users = await connection.QueryAsync<User>(sql, new
        {
            userId,
        });

        return users.FirstOrDefault();
    }

    public async Task DeleteUserById(int userId)
    {
        using var connection = await database.OpenConnectionAsync();

        var sql = @"
            DELETE FROM User 
            WHERE Id = @userId;
        ";
        await connection.ExecuteAsync(sql, new
        {
            userId,
        });
    }
}
