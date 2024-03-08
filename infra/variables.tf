variable "token_key" {
  description = "JWT token key"
  type        = string
  sensitive   = true
}

variable "mysql_password" {
  description = "MySQL password"
  type        = string
  sensitive   = true
}

variable "mysql_username" {
  description = "MySQL password"
  type        = string
}

variable "mysql_database_name" {
  description = "MySQL password"
  default     = "robic"
  type        = string
}
