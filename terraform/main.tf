# MindCart Infrastructure Configuration
# AWS ECS + S3 + DynamoDB setup for South African grocery price comparison app

terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# Data sources
data "aws_availability_zones" "available" {
  state = "available"
}

data "aws_caller_identity" "current" {}

# VPC Configuration
resource "aws_vpc" "mindcart_vpc" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name        = "mindcart-vpc"
    Environment = var.environment
    Project     = "mindcart"
  }
}

resource "aws_internet_gateway" "mindcart_igw" {
  vpc_id = aws_vpc.mindcart_vpc.id

  tags = {
    Name        = "mindcart-igw"
    Environment = var.environment
    Project     = "mindcart"
  }
}

# Public Subnets
resource "aws_subnet" "public_subnets" {
  count = length(var.public_subnet_cidrs)

  vpc_id                  = aws_vpc.mindcart_vpc.id
  cidr_block              = var.public_subnet_cidrs[count.index]
  availability_zone       = data.aws_availability_zones.available.names[count.index]
  map_public_ip_on_launch = true

  tags = {
    Name        = "mindcart-public-subnet-${count.index + 1}"
    Environment = var.environment
    Project     = "mindcart"
    Type        = "Public"
  }
}

# Private Subnets
resource "aws_subnet" "private_subnets" {
  count = length(var.private_subnet_cidrs)

  vpc_id            = aws_vpc.mindcart_vpc.id
  cidr_block        = var.private_subnet_cidrs[count.index]
  availability_zone = data.aws_availability_zones.available.names[count.index]

  tags = {
    Name        = "mindcart-private-subnet-${count.index + 1}"
    Environment = var.environment
    Project     = "mindcart"
    Type        = "Private"
  }
}

# Route Tables
resource "aws_route_table" "public_rt" {
  vpc_id = aws_vpc.mindcart_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.mindcart_igw.id
  }

  tags = {
    Name        = "mindcart-public-rt"
    Environment = var.environment
    Project     = "mindcart"
  }
}

resource "aws_route_table_association" "public_rta" {
  count = length(aws_subnet.public_subnets)

  subnet_id      = aws_subnet.public_subnets[count.index].id
  route_table_id = aws_route_table.public_rt.id
}

# Security Groups
resource "aws_security_group" "alb_sg" {
  name_prefix = "mindcart-alb-sg"
  vpc_id      = aws_vpc.mindcart_vpc.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "mindcart-alb-sg"
    Environment = var.environment
    Project     = "mindcart"
  }
}

resource "aws_security_group" "ecs_sg" {
  name_prefix = "mindcart-ecs-sg"
  vpc_id      = aws_vpc.mindcart_vpc.id

  ingress {
    from_port       = 3000
    to_port         = 3000
    protocol        = "tcp"
    security_groups = [aws_security_group.alb_sg.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "mindcart-ecs-sg"
    Environment = var.environment
    Project     = "mindcart"
  }
}

# Application Load Balancer
resource "aws_lb" "mindcart_alb" {
  name               = "mindcart-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb_sg.id]
  subnets            = aws_subnet.public_subnets[*].id

  enable_deletion_protection = false

  tags = {
    Name        = "mindcart-alb"
    Environment = var.environment
    Project     = "mindcart"
  }
}

resource "aws_lb_target_group" "mindcart_tg" {
  name        = "mindcart-tg"
  port        = 3000
  protocol    = "HTTP"
  vpc_id      = aws_vpc.mindcart_vpc.id
  target_type = "ip"

  health_check {
    enabled             = true
    healthy_threshold   = 2
    unhealthy_threshold = 2
    timeout             = 5
    interval            = 30
    path                = "/health"
    matcher             = "200"
    port                = "traffic-port"
    protocol            = "HTTP"
  }

  tags = {
    Name        = "mindcart-tg"
    Environment = var.environment
    Project     = "mindcart"
  }
}

resource "aws_lb_listener" "mindcart_listener" {
  load_balancer_arn = aws_lb.mindcart_alb.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.mindcart_tg.arn
  }
}

# ECS Cluster
resource "aws_ecs_cluster" "mindcart_cluster" {
  name = "mindcart-cluster"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }

  tags = {
    Name        = "mindcart-cluster"
    Environment = var.environment
    Project     = "mindcart"
  }
}

# ECS Task Definition
resource "aws_ecs_task_definition" "mindcart_task" {
  family                   = "mindcart-task"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = var.ecs_cpu
  memory                   = var.ecs_memory
  execution_role_arn       = aws_iam_role.ecs_execution_role.arn
  task_role_arn            = aws_iam_role.ecs_task_role.arn

  container_definitions = jsonencode([
    {
      name  = "mindcart-app"
      image = "${var.aws_account_id}.dkr.ecr.${var.aws_region}.amazonaws.com/mindcart:latest"
      
      portMappings = [
        {
          containerPort = 3000
          hostPort      = 3000
          protocol      = "tcp"
        }
      ]

      environment = [
        {
          name  = "NODE_ENV"
          value = var.environment
        },
        {
          name  = "PORT"
          value = "3000"
        }
      ]

      secrets = [
        {
          name      = "DATABASE_URL"
          valueFrom = aws_ssm_parameter.database_url.arn
        }
      ]

      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = aws_cloudwatch_log_group.mindcart_logs.name
          "awslogs-region"        = var.aws_region
          "awslogs-stream-prefix" = "ecs"
        }
      }

      healthCheck = {
        command     = ["CMD-SHELL", "curl -f http://localhost:3000/health || exit 1"]
        interval    = 30
        timeout     = 5
        retries     = 3
        startPeriod = 60
      }
    }
  ])

  tags = {
    Name        = "mindcart-task"
    Environment = var.environment
    Project     = "mindcart"
  }
}

# ECS Service
resource "aws_ecs_service" "mindcart_service" {
  name            = "mindcart-service"
  cluster         = aws_ecs_cluster.mindcart_cluster.id
  task_definition = aws_ecs_task_definition.mindcart_task.arn
  desired_count   = var.ecs_desired_count
  launch_type     = "FARGATE"

  network_configuration {
    security_groups  = [aws_security_group.ecs_sg.id]
    subnets          = aws_subnet.private_subnets[*].id
    assign_public_ip = false
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.mindcart_tg.arn
    container_name   = "mindcart-app"
    container_port   = 3000
  }

  depends_on = [aws_lb_listener.mindcart_listener]

  tags = {
    Name        = "mindcart-service"
    Environment = var.environment
    Project     = "mindcart"
  }
}

# S3 Bucket for Static Assets
resource "aws_s3_bucket" "mindcart_static" {
  bucket = "${var.project_name}-static-assets-${random_id.bucket_suffix.hex}"

  tags = {
    Name        = "mindcart-static-assets"
    Environment = var.environment
    Project     = "mindcart"
  }
}

resource "aws_s3_bucket_public_access_block" "mindcart_static_pab" {
  bucket = aws_s3_bucket.mindcart_static.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_website_configuration" "mindcart_static_website" {
  bucket = aws_s3_bucket.mindcart_static.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "error.html"
  }
}

resource "aws_s3_bucket_policy" "mindcart_static_policy" {
  bucket = aws_s3_bucket.mindcart_static.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.mindcart_static.arn}/*"
      }
    ]
  })

  depends_on = [aws_s3_bucket_public_access_block.mindcart_static_pab]
}

# DynamoDB Tables
resource "aws_dynamodb_table" "products" {
  name           = "mindcart-products"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"
  range_key      = "store"

  attribute {
    name = "id"
    type = "S"
  }

  attribute {
    name = "store"
    type = "S"
  }

  attribute {
    name = "category"
    type = "S"
  }

  global_secondary_index {
    name     = "category-index"
    hash_key = "category"
  }

  tags = {
    Name        = "mindcart-products"
    Environment = var.environment
    Project     = "mindcart"
  }
}

resource "aws_dynamodb_table" "price_history" {
  name           = "mindcart-price-history"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "product_id"
  range_key      = "timestamp"

  attribute {
    name = "product_id"
    type = "S"
  }

  attribute {
    name = "timestamp"
    type = "S"
  }

  ttl {
    attribute_name = "ttl"
    enabled        = true
  }

  tags = {
    Name        = "mindcart-price-history"
    Environment = var.environment
    Project     = "mindcart"
  }
}

# CloudWatch Log Group
resource "aws_cloudwatch_log_group" "mindcart_logs" {
  name              = "/ecs/mindcart"
  retention_in_days = 30

  tags = {
    Name        = "mindcart-logs"
    Environment = var.environment
    Project     = "mindcart"
  }
}

# Random ID for S3 bucket suffix
resource "random_id" "bucket_suffix" {
  byte_length = 4
}

# SSM Parameter for Database URL
resource "aws_ssm_parameter" "database_url" {
  name  = "/mindcart/database-url"
  type  = "SecureString"
  value = "dynamodb://${aws_dynamodb_table.products.name}"

  tags = {
    Name        = "mindcart-database-url"
    Environment = var.environment
    Project     = "mindcart"
  }
}
