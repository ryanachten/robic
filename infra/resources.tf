
resource "heroku_app" "robic" {
  name   = var.heroku_app_name
  region = "us"
  stack  = "container"

  config_vars = {
    ASPNETCORE_ENVIRONMENT = "Production"
    TokenKey               = var.token_key
    DatabaseName           = var.database_name
    ConnectionString       = var.connection_string
  }
}

resource "heroku_build" "build" {
  app = heroku_app.robic.id

  source {
    path = "../api/"
  }
}
