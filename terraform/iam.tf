# IAM Roles and Policies for MindCart

# ECS Execution Role
resource "aws_iam_role" "ecs_execution_role" {
  name = "mindcart-ecs-execution-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      }
    ]
  })

  tags = {
    Name        = "mindcart-ecs-execution-role"
    Environment = var.environment
    Project     = "mindcart"
  }
}

resource "aws_iam_role_policy_attachment" "ecs_execution_role_policy" {
  role       = aws_iam_role.ecs_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

# ECS Task Role
resource "aws_iam_role" "ecs_task_role" {
  name = "mindcart-ecs-task-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      }
    ]
  })

  tags = {
    Name        = "mindcart-ecs-task-role"
    Environment = var.environment
    Project     = "mindcart"
  }
}

# Custom policy for ECS task role
resource "aws_iam_policy" "ecs_task_policy" {
  name        = "mindcart-ecs-task-policy"
  description = "Policy for MindCart ECS task to access AWS services"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
          "dynamodb:Query",
          "dynamodb:Scan",
          "dynamodb:BatchGetItem",
          "dynamodb:BatchWriteItem"
        ]
        Resource = [
          aws_dynamodb_table.products.arn,
          "${aws_dynamodb_table.products.arn}/index/*",
          aws_dynamodb_table.price_history.arn,
          "${aws_dynamodb_table.price_history.arn}/index/*"
        ]
      },
      {
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:PutObject",
          "s3:DeleteObject",
          "s3:ListBucket"
        ]
        Resource = [
          aws_s3_bucket.mindcart_static.arn,
          "${aws_s3_bucket.mindcart_static.arn}/*"
        ]
      },
      {
        Effect = "Allow"
        Action = [
          "ssm:GetParameter",
          "ssm:GetParameters",
          "ssm:GetParametersByPath"
        ]
        Resource = [
          aws_ssm_parameter.database_url.arn
        ]
      },
      {
        Effect = "Allow"
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents",
          "logs:DescribeLogStreams"
        ]
        Resource = [
          aws_cloudwatch_log_group.mindcart_logs.arn,
          "${aws_cloudwatch_log_group.mindcart_logs.arn}:*"
        ]
      },
      {
        Effect = "Allow"
        Action = [
          "ecr:GetAuthorizationToken",
          "ecr:BatchCheckLayerAvailability",
          "ecr:GetDownloadUrlForLayer",
          "ecr:BatchGetImage"
        ]
        Resource = "*"
      }
    ]
  })

  tags = {
    Name        = "mindcart-ecs-task-policy"
    Environment = var.environment
    Project     = "mindcart"
  }
}

resource "aws_iam_role_policy_attachment" "ecs_task_policy_attachment" {
  role       = aws_iam_role.ecs_task_role.name
  policy_arn = aws_iam_policy.ecs_task_policy.arn
}

# Auto Scaling Role
resource "aws_iam_role" "ecs_autoscaling_role" {
  name = "mindcart-ecs-autoscaling-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "application-autoscaling.amazonaws.com"
        }
      }
    ]
  })

  tags = {
    Name        = "mindcart-ecs-autoscaling-role"
    Environment = var.environment
    Project     = "mindcart"
  }
}

resource "aws_iam_role_policy_attachment" "ecs_autoscaling_role_policy" {
  role       = aws_iam_role.ecs_autoscaling_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonEC2ContainerServiceAutoscalingRole"
}

# GitHub Actions Role (for CI/CD)
resource "aws_iam_role" "github_actions_role" {
  name = "mindcart-github-actions-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Federated = "arn:aws:iam::${var.aws_account_id}:oidc-provider/token.actions.githubusercontent.com"
        }
        Condition = {
          StringEquals = {
            "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com"
          }
          StringLike = {
            "token.actions.githubusercontent.com:sub" = "repo:your-username/mindcart:*"
          }
        }
      }
    ]
  })

  tags = {
    Name        = "mindcart-github-actions-role"
    Environment = var.environment
    Project     = "mindcart"
  }
}

# GitHub Actions Policy
resource "aws_iam_policy" "github_actions_policy" {
  name        = "mindcart-github-actions-policy"
  description = "Policy for GitHub Actions to deploy MindCart"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "ecr:GetAuthorizationToken",
          "ecr:BatchCheckLayerAvailability",
          "ecr:GetDownloadUrlForLayer",
          "ecr:BatchGetImage",
          "ecr:InitiateLayerUpload",
          "ecr:UploadLayerPart",
          "ecr:CompleteLayerUpload",
          "ecr:PutImage"
        ]
        Resource = "*"
      },
      {
        Effect = "Allow"
        Action = [
          "ecs:UpdateService",
          "ecs:DescribeServices",
          "ecs:DescribeTaskDefinition",
          "ecs:RegisterTaskDefinition"
        ]
        Resource = "*"
      },
      {
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:PutObject",
          "s3:DeleteObject",
          "s3:ListBucket",
          "s3:PutObjectAcl"
        ]
        Resource = [
          aws_s3_bucket.mindcart_static.arn,
          "${aws_s3_bucket.mindcart_static.arn}/*"
        ]
      },
      {
        Effect = "Allow"
        Action = [
          "iam:PassRole"
        ]
        Resource = [
          aws_iam_role.ecs_execution_role.arn,
          aws_iam_role.ecs_task_role.arn
        ]
      }
    ]
  })

  tags = {
    Name        = "mindcart-github-actions-policy"
    Environment = var.environment
    Project     = "mindcart"
  }
}

resource "aws_iam_role_policy_attachment" "github_actions_policy_attachment" {
  role       = aws_iam_role.github_actions_role.name
  policy_arn = aws_iam_policy.github_actions_policy.arn
}

# CloudWatch Alarms Role (if monitoring is enabled)
resource "aws_iam_role" "cloudwatch_alarms_role" {
  count = var.enable_cloudwatch_alarms ? 1 : 0
  name  = "mindcart-cloudwatch-alarms-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ecs.amazonaws.com"
        }
      }
    ]
  })

  tags = {
    Name        = "mindcart-cloudwatch-alarms-role"
    Environment = var.environment
    Project     = "mindcart"
  }
}

# Lambda Role (for price scraping functions)
resource "aws_iam_role" "lambda_price_scraper_role" {
  name = "mindcart-lambda-price-scraper-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })

  tags = {
    Name        = "mindcart-lambda-price-scraper-role"
    Environment = var.environment
    Project     = "mindcart"
  }
}

resource "aws_iam_role_policy_attachment" "lambda_basic_execution" {
  role       = aws_iam_role.lambda_price_scraper_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# Lambda Price Scraper Policy
resource "aws_iam_policy" "lambda_price_scraper_policy" {
  name        = "mindcart-lambda-price-scraper-policy"
  description = "Policy for Lambda price scraper functions"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:GetItem",
          "dynamodb:Query",
          "dynamodb:Scan"
        ]
        Resource = [
          aws_dynamodb_table.products.arn,
          "${aws_dynamodb_table.products.arn}/index/*",
          aws_dynamodb_table.price_history.arn,
          "${aws_dynamodb_table.price_history.arn}/index/*"
        ]
      },
      {
        Effect = "Allow"
        Action = [
          "ssm:GetParameter",
          "ssm:GetParameters"
        ]
        Resource = [
          aws_ssm_parameter.database_url.arn
        ]
      }
    ]
  })

  tags = {
    Name        = "mindcart-lambda-price-scraper-policy"
    Environment = var.environment
    Project     = "mindcart"
  }
}

resource "aws_iam_role_policy_attachment" "lambda_price_scraper_policy_attachment" {
  role       = aws_iam_role.lambda_price_scraper_role.name
  policy_arn = aws_iam_policy.lambda_price_scraper_policy.arn
}
