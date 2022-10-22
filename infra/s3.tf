resource "aws_s3_bucket" "terrafrom-state" {
  bucket = "robic-tf-state"

  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_s3_bucket_versioning" "terrafrom-state-versioning" {
  bucket = aws_s3_bucket.terrafrom-state.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "terrafrom-state-encryption" {
  bucket = aws_s3_bucket.terrafrom-state.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}
