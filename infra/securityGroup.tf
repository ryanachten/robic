resource "aws_security_group" "ec2_sg" {
  description = "Subgroup for EC2 ingress and egress"
  ingress {
    description = "IP for SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["18.206.107.24/29"] # IP for us-east-1 EC2_INSTANCE_CONNECT service as per https://ip-ranges.amazonaws.com/ip-ranges.json
  }
  ingress {
    description = "Public HTTP Internet Ingress"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    description = "Public HTTPS Internet Ingress"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    description      = "Public Internet Egress"
    from_port        = 0
    to_port          = 0
    protocol         = "-1" # Will apply for all protocols
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }
}
