variable "token_key" {
  description = "JWT token key"
  type        = string
  sensitive   = true
}

variable "database_name" {
  description = "MongoDB database name"
  type        = string
}

variable "connection_string" {
  description = "MongoDB connection string"
  type        = string
  sensitive   = true
}
