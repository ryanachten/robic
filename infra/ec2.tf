resource "aws_instance" "server" {
  ami                         = "ami-05fa00d4c63e32376" # AWS Linux AMI in us-east-1
  instance_type               = "t3.micro"
  associate_public_ip_address = true
  user_data = base64encode(templatefile("${path.module}/launch-instance.tftpl", {
    token_key         = var.token_key
    database_name     = var.database_name
    connection_string = var.connection_string
  }))
  user_data_replace_on_change = true # ensures instance is recreated when launch data changes
  vpc_security_group_ids      = [aws_security_group.ec2_sg.id]
}

// Elastic IP to create a static IP for the EC2
resource "aws_eip" "static_ip" {
  instance = aws_instance.server.id
  vpc      = true
}
