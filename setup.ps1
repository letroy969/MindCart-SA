# MindCart Setup Script for Windows PowerShell
# This script sets up the MindCart project for development

param(
    [switch]$SkipChecks
)

# Colors for output
$Red = "Red"
$Green = "Green"
$Yellow = "Yellow"
$Blue = "Blue"

# Function to print colored output
function Write-Status {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor $Blue
}

function Write-Success {
    param([string]$Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor $Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor $Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor $Red
}

# Check if Node.js is installed
function Test-Node {
    try {
        $nodeVersion = node --version
        if ($LASTEXITCODE -ne 0) {
            throw "Node.js not found"
        }
        
        $versionNumber = [int]($nodeVersion -replace 'v(\d+)\..*', '$1')
        if ($versionNumber -lt 18) {
            Write-Error "Node.js version 18+ is required. Current version: $nodeVersion"
            exit 1
        }
        
        Write-Success "Node.js $nodeVersion is installed"
        return $true
    }
    catch {
        Write-Error "Node.js is not installed. Please install Node.js 18+ and try again."
        exit 1
    }
}

# Check if npm is installed
function Test-Npm {
    try {
        $npmVersion = npm --version
        if ($LASTEXITCODE -ne 0) {
            throw "npm not found"
        }
        
        Write-Success "npm $npmVersion is installed"
        return $true
    }
    catch {
        Write-Error "npm is not installed. Please install npm and try again."
        exit 1
    }
}

# Install dependencies
function Install-Dependencies {
    Write-Status "Installing dependencies..."
    try {
        npm install
        if ($LASTEXITCODE -eq 0) {
            Write-Success "Dependencies installed successfully"
        } else {
            throw "npm install failed"
        }
    }
    catch {
        Write-Error "Failed to install dependencies"
        exit 1
    }
}

# Create environment file
function New-EnvFile {
    if (-not (Test-Path ".env.local")) {
        Write-Status "Creating .env.local file..."
        $envContent = @"
REACT_APP_API_BASE_URL=http://localhost:3001
REACT_APP_ENVIRONMENT=development
REACT_APP_AWS_REGION=af-south-1
"@
        $envContent | Out-File -FilePath ".env.local" -Encoding UTF8
        Write-Success ".env.local file created"
    } else {
        Write-Warning ".env.local already exists, skipping creation"
    }
}

# Check if AWS CLI is installed (optional)
function Test-AwsCli {
    try {
        $awsVersion = aws --version
        if ($LASTEXITCODE -eq 0) {
            Write-Success "AWS CLI is installed"
            
            # Check if credentials are configured
            try {
                aws sts get-caller-identity | Out-Null
                if ($LASTEXITCODE -eq 0) {
                    Write-Success "AWS credentials are configured"
                } else {
                    Write-Warning "AWS credentials not configured. Run 'aws configure' to set up credentials."
                }
            }
            catch {
                Write-Warning "AWS credentials not configured. Run 'aws configure' to set up credentials."
            }
        } else {
            throw "AWS CLI not found"
        }
    }
    catch {
        Write-Warning "AWS CLI not installed. Install it for deployment features."
    }
}

# Check if Terraform is installed (optional)
function Test-Terraform {
    try {
        $terraformVersion = terraform --version
        if ($LASTEXITCODE -eq 0) {
            Write-Success "Terraform is installed"
        } else {
            throw "Terraform not found"
        }
    }
    catch {
        Write-Warning "Terraform not installed. Install it for infrastructure management."
    }
}

# Create necessary directories
function New-Directories {
    Write-Status "Creating necessary directories..."
    $directories = @(
        "public/logos",
        "src/components",
        "src/pages", 
        "src/services",
        "src/styles"
    )
    
    foreach ($dir in $directories) {
        if (-not (Test-Path $dir)) {
            New-Item -ItemType Directory -Path $dir -Force | Out-Null
        }
    }
    
    Write-Success "Directories created"
}

# Run initial build test
function Test-Build {
    Write-Status "Testing build process..."
    try {
        npm run build
        if ($LASTEXITCODE -eq 0) {
            Write-Success "Build test passed"
        } else {
            throw "Build failed"
        }
    }
    catch {
        Write-Error "Build test failed"
        exit 1
    }
}

# Main setup function
function Start-Setup {
    Write-Host "🛒 Setting up MindCart..." -ForegroundColor $Blue
    Write-Host ""
    
    # Check prerequisites
    Test-Node
    Test-Npm
    Test-AwsCli
    Test-Terraform
    
    Write-Host ""
    
    # Setup project
    New-Directories
    Install-Dependencies
    New-EnvFile
    Test-Build
    
    Write-Host ""
    Write-Success "MindCart setup completed successfully! 🎉"
    Write-Host ""
    Write-Host "Next steps:"
    Write-Host "1. Run 'npm start' to start the development server"
    Write-Host "2. Open http://localhost:3000 in your browser"
    Write-Host "3. Configure AWS credentials for deployment: 'aws configure'"
    Write-Host "4. Run 'cd terraform; terraform init' to initialize infrastructure"
    Write-Host ""
    Write-Host "Happy coding! 🛒" -ForegroundColor $Green
}

# Run main function
Start-Setup
