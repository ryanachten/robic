variable "heroku_app_name" {
  description = "Heroku app name"
  type        = string
  default = "robic"
}

#### SECRETS - Replaced by process environment variables ####
variable "heroku_api_key" {
  description = "Heroku account API key"
  type        = string
  sensitive   = true
}

variable "heroku_email" {
  description = "Heroku account email address"
  type        = string
}

variable "token_key" {
  description = "Token key used for JWT signing"
  type        = string
  sensitive   = true
}

variable "database_name" {
  description = "Name of MongoDB database"
  type        = string
}

variable "connection_string" {
  description = "MongoDB database connection string"
  type        = string
  sensitive   = true
}
