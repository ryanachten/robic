# MongoDB Migration

The Robic Migrator is a small .NET command line application which enables the migration of Robic users from MongoDB to MySQL datastores as part of our infrastructure changes.

It can be run locally by first configuring a couple of environment variables:

```bash
$env:MongoConnectionString = "MongoDB database connection string"
$env:MongoDatabaseName = "MongoDB database name"
$env:MySQLConnectionString = "MySQL connection string"
```

It can then be executed by passing in the following arguments:

- `mongoDbUserId`: the source MongoDB user ID of the user we want to migrate
- `mysqlUserId`: the destination user ID of the MySQL of the user we want to migrate the records to
  - we can create a new user calling the `/auth/register` endpoint in `Robic.Service`

```bash
cd .\Robic.Migrator\ # ensure you're in the migrator directory
dotnet run -- --mongoDbUserId="123abc" --mysqlUserId=1
```

The command line application will then migrate all definitions and exercises associated with the MongoDB user and create corresponding MySQL records.
