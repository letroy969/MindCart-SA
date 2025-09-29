#!/bin/bash

# MindCart Setup Script
# This script sets up the MindCart project for development

set -e

echo "🛒 Setting up MindCart..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
check_node() {
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+ and try again."
        exit 1
    fi
    
    NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        print_error "Node.js version 18+ is required. Current version: $(node --version)"
        exit 1
    fi
    
    print_success "Node.js $(node --version) is installed"
}

# Check if npm is installed
check_npm() {
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm and try again."
        exit 1
    fi
    
    print_success "npm $(npm --version) is installed"
}

# Install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    npm install
    print_success "Dependencies installed successfully"
}

# Create environment file
create_env_file() {
    if [ ! -f .env.local ]; then
        print_status "Creating .env.local file..."
        cat > .env.local << EOF
REACT_APP_API_BASE_URL=http://localhost:3001
REACT_APP_ENVIRONMENT=development
REACT_APP_AWS_REGION=af-south-1
EOF
        print_success ".env.local file created"
    else
        print_warning ".env.local already exists, skipping creation"
    fi
}

# Check if AWS CLI is installed (optional)
check_aws_cli() {
    if command -v aws &> /dev/null; then
        print_success "AWS CLI is installed"
        if aws sts get-caller-identity &> /dev/null; then
            print_success "AWS credentials are configured"
        else
            print_warning "AWS credentials not configured. Run 'aws configure' to set up credentials."
        fi
    else
        print_warning "AWS CLI not installed. Install it for deployment features."
    fi
}

# Check if Terraform is installed (optional)
check_terraform() {
    if command -v terraform &> /dev/null; then
        print_success "Terraform is installed"
    else
        print_warning "Terraform not installed. Install it for infrastructure management."
    fi
}

# Create necessary directories
create_directories() {
    print_status "Creating necessary directories..."
    mkdir -p public/logos
    mkdir -p src/components
    mkdir -p src/pages
    mkdir -p src/services
    mkdir -p src/styles
    print_success "Directories created"
}

# Run initial build test
test_build() {
    print_status "Testing build process..."
    if npm run build; then
        print_success "Build test passed"
    else
        print_error "Build test failed"
        exit 1
    fi
}

# Main setup function
main() {
    echo "🚀 Starting MindCart setup..."
    echo ""
    
    # Check prerequisites
    check_node
    check_npm
    check_aws_cli
    check_terraform
    
    echo ""
    
    # Setup project
    create_directories
    install_dependencies
    create_env_file
    test_build
    
    echo ""
    print_success "MindCart setup completed successfully! 🎉"
    echo ""
    echo "Next steps:"
    echo "1. Run 'npm start' to start the development server"
    echo "2. Open http://localhost:3000 in your browser"
    echo "3. Configure AWS credentials for deployment: 'aws configure'"
    echo "4. Run 'cd terraform && terraform init' to initialize infrastructure"
    echo ""
    echo "Happy coding! 🛒"
}

# Run main function
main "$@"
