resource "aws_db_instance" "robic" {
  allocated_storage     = 20
  engine                = "mysql"
  engine_version        = "8.0.35"
  instance_class        = "db.t3.micro"
  username              = var.mysql_username
  password              = var.mysql_password
  parameter_group_name  = "default.mysql8.0"
  publicly_accessible   = true
  skip_final_snapshot   = true
  copy_tags_to_snapshot = true
}
