# Infrastructure Development

- Install Terraform (using `v1.1.4` at the time of writing)
- Set environment variables:

```bash
# Terraform environment variables
$env:TF_VAR_heroku_api_key="API key from Heroku"
$env:TF_VAR_heroku_email="Email address for Heroku account"
$env:TF_VAR_token_key="Token for signing JWT token"
$env:TF_VAR_database_name="MongoDB database name"
$env:TF_VAR_connection_string="MongoDB connection string"
```

- Initialise TF: `terraform init`
- Run TF plan to ensure resources to be created are correct: `terraform plan`
- Execute TF plan to create resources: `terraform apply`