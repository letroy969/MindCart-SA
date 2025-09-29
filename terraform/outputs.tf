# MindCart Terraform Outputs

# VPC Outputs
output "vpc_id" {
  description = "ID of the VPC"
  value       = aws_vpc.mindcart_vpc.id
}

output "vpc_cidr_block" {
  description = "CIDR block of the VPC"
  value       = aws_vpc.mindcart_vpc.cidr_block
}

output "public_subnet_ids" {
  description = "IDs of the public subnets"
  value       = aws_subnet.public_subnets[*].id
}

output "private_subnet_ids" {
  description = "IDs of the private subnets"
  value       = aws_subnet.private_subnets[*].id
}

# Load Balancer Outputs
output "alb_dns_name" {
  description = "DNS name of the Application Load Balancer"
  value       = aws_lb.mindcart_alb.dns_name
}

output "alb_zone_id" {
  description = "Zone ID of the Application Load Balancer"
  value       = aws_lb.mindcart_alb.zone_id
}

output "alb_arn" {
  description = "ARN of the Application Load Balancer"
  value       = aws_lb.mindcart_alb.arn
}

output "alb_url" {
  description = "URL of the Application Load Balancer"
  value       = "http://${aws_lb.mindcart_alb.dns_name}"
}

# ECS Outputs
output "ecs_cluster_id" {
  description = "ID of the ECS cluster"
  value       = aws_ecs_cluster.mindcart_cluster.id
}

output "ecs_cluster_arn" {
  description = "ARN of the ECS cluster"
  value       = aws_ecs_cluster.mindcart_cluster.arn
}

output "ecs_service_name" {
  description = "Name of the ECS service"
  value       = aws_ecs_service.mindcart_service.name
}

output "ecs_task_definition_arn" {
  description = "ARN of the ECS task definition"
  value       = aws_ecs_task_definition.mindcart_task.arn
}

# S3 Outputs
output "s3_bucket_name" {
  description = "Name of the S3 bucket for static assets"
  value       = aws_s3_bucket.mindcart_static.bucket
}

output "s3_bucket_arn" {
  description = "ARN of the S3 bucket for static assets"
  value       = aws_s3_bucket.mindcart_static.arn
}

output "s3_bucket_domain_name" {
  description = "Domain name of the S3 bucket"
  value       = aws_s3_bucket.mindcart_static.bucket_domain_name
}

output "s3_website_endpoint" {
  description = "Website endpoint of the S3 bucket"
  value       = aws_s3_bucket_website_configuration.mindcart_static_website.website_endpoint
}

# DynamoDB Outputs
output "dynamodb_products_table_name" {
  description = "Name of the DynamoDB products table"
  value       = aws_dynamodb_table.products.name
}

output "dynamodb_products_table_arn" {
  description = "ARN of the DynamoDB products table"
  value       = aws_dynamodb_table.products.arn
}

output "dynamodb_price_history_table_name" {
  description = "Name of the DynamoDB price history table"
  value       = aws_dynamodb_table.price_history.name
}

output "dynamodb_price_history_table_arn" {
  description = "ARN of the DynamoDB price history table"
  value       = aws_dynamodb_table.price_history.arn
}

# CloudWatch Outputs
output "cloudwatch_log_group_name" {
  description = "Name of the CloudWatch log group"
  value       = aws_cloudwatch_log_group.mindcart_logs.name
}

output "cloudwatch_log_group_arn" {
  description = "ARN of the CloudWatch log group"
  value       = aws_cloudwatch_log_group.mindcart_logs.arn
}

# Security Group Outputs
output "alb_security_group_id" {
  description = "ID of the ALB security group"
  value       = aws_security_group.alb_sg.id
}

output "ecs_security_group_id" {
  description = "ID of the ECS security group"
  value       = aws_security_group.ecs_sg.id
}

# Application URLs
output "application_url" {
  description = "URL of the MindCart application"
  value       = "http://${aws_lb.mindcart_alb.dns_name}"
}

output "static_assets_url" {
  description = "URL of the static assets S3 bucket"
  value       = "http://${aws_s3_bucket_website_configuration.mindcart_static_website.website_endpoint}"
}

# Database Connection Info
output "database_url_parameter_name" {
  description = "Name of the SSM parameter containing database URL"
  value       = aws_ssm_parameter.database_url.name
}

# Resource Summary
output "resource_summary" {
  description = "Summary of created resources"
  value = {
    vpc_id                    = aws_vpc.mindcart_vpc.id
    alb_dns_name             = aws_lb.mindcart_alb.dns_name
    ecs_cluster_name         = aws_ecs_cluster.mindcart_cluster.name
    s3_bucket_name           = aws_s3_bucket.mindcart_static.bucket
    dynamodb_products_table  = aws_dynamodb_table.products.name
    dynamodb_price_history   = aws_dynamodb_table.price_history.name
    log_group_name           = aws_cloudwatch_log_group.mindcart_logs.name
  }
}

# Cost Estimation (if available)
output "estimated_monthly_cost" {
  description = "Estimated monthly cost for the infrastructure"
  value = {
    note = "Cost estimation depends on actual usage patterns"
    components = {
      ecs_fargate = "~$20-50/month (depending on CPU/memory usage)"
      alb         = "~$16/month (fixed cost)"
      dynamodb    = "~$5-20/month (depending on read/write capacity)"
      s3          = "~$1-5/month (depending on storage and requests)"
      cloudwatch  = "~$5-15/month (depending on log volume)"
      total       = "~$47-106/month (estimated range)"
    }
  }
}

# Deployment Instructions
output "deployment_instructions" {
  description = "Instructions for deploying the application"
  value = {
    step_1 = "Build and push Docker image to ECR"
    step_2 = "Update ECS service with new task definition"
    step_3 = "Deploy static assets to S3 bucket"
    step_4 = "Configure custom domain (optional)"
    step_5 = "Set up monitoring and alerts"
    commands = {
      build_image = "docker build -t mindcart ."
      tag_image   = "docker tag mindcart:latest ${var.aws_account_id}.dkr.ecr.${var.aws_region}.amazonaws.com/mindcart:latest"
      push_image  = "docker push ${var.aws_account_id}.dkr.ecr.${var.aws_region}.amazonaws.com/mindcart:latest"
      sync_assets = "aws s3 sync ./build s3://${aws_s3_bucket.mindcart_static.bucket} --delete"
    }
  }
}
