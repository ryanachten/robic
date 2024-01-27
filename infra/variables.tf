variable "token_key" {
  description = "JWT token key"
  type        = string
  sensitive   = true
}

variable "connection_string" {
  description = "MySQL connection string"
  type        = string
  sensitive   = true
}
