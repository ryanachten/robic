# Infrastructure Development

- Install Terraform (using `v1.1.4` at the time of writing)
- Set environment variables:

```bash
# Terraform environment variables
$env:TF_VAR_token_key="Token for signing JWT token"
$env:TF_VAR_mysql_username="MySQL DB username"
$env:TF_VAR_mysql_password="MySQL DB password"
```

- Assume role with AWS account credentials
  - i.e. using [awsume](https://awsu.me/) where a profile `robic` declared in `.aws/config` and `.aws/credentials` with necessary credentials can be assumed via `awsume robic`
- Initialise TF: `terraform init`
- Run TF plan to ensure resources to be created are correct: `terraform plan`
- Execute TF plan to create resources: `terraform apply`
