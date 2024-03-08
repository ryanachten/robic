resource "aws_instance" "server" {
  ami                         = "ami-05fa00d4c63e32376" # AWS Linux AMI in us-east-1
  instance_type               = "t3.micro"
  associate_public_ip_address = true
  user_data = base64encode(templatefile("${path.module}/launch-instance.tftpl", {
    token_key         = var.token_key
    connection_string = "Server=${aws_db_instance.robic.address};Database=${var.mysql_database_name};user=${var.mysql_username};password=${var.mysql_password};"
  }))
  user_data_replace_on_change = true # ensures instance is recreated when launch data changes
  vpc_security_group_ids      = [aws_security_group.ec2_sg.id]
  depends_on                  = [aws_db_instance.robic]
}

// Elastic IP to create a static IP for the EC2
resource "aws_eip" "static_ip" {
  instance = aws_instance.server.id
  vpc      = true
}
