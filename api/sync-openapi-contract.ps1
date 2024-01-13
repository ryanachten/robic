# Updates TypeScript API type definitions based on .NET service OpenAPI specification

# Build latest service OpenAPI spec
# NOTE: requires environment variables to be set for .NET build (run `./startup.ps1` first) 
dotnet tool install swashbuckle.aspnetcore.cli --framework net8.0 --version 6.5.0 --global --ignore-failed-sources
Push-Location .\Robic.Service
dotnet build -c Release

swagger tofile --yaml --output ..\robic-openapi.yaml .\bin\Release\net8.0\Robic.Service.dll v1

Pop-Location

# Generate updated TypeScript types using spec
Push-Location ..\app
yarn generate-openapi-types

Pop-Location
