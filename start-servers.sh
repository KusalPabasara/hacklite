#!/bin/bash

# MetaMind Platform - Start Servers Script
# This script starts both backend and frontend servers

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 MetaMind Platform - Starting Servers${NC}"
echo -e "${BLUE}=====================================${NC}"

# Function to print status messages
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if .env file exists
if [[ ! -f "backend/.env" ]]; then
    print_error ".env file not found in backend directory"
    print_info "Please run the database setup first:"
    echo "  ./fix-postgres-connection.sh"
    exit 1
fi

# Check if backend dependencies are installed
if [[ ! -d "backend/node_modules" ]]; then
    print_error "Backend dependencies not installed"
    print_info "Installing backend dependencies..."
    cd backend
    npm install
    cd ..
fi

# Check if frontend dependencies are installed
if [[ ! -d "frontend/node_modules" ]]; then
    print_error "Frontend dependencies not installed"
    print_info "Installing frontend dependencies..."
    cd frontend
    npm install
    cd ..
fi

print_info "Starting backend server..."
print_info "Backend will run on: http://localhost:5000"
print_info "Frontend will run on: http://localhost:3000 (or 5174)"
echo ""

# Start backend in background
print_info "Starting backend server..."
cd backend
npm run dev &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 3

# Check if backend is running
if curl -s http://localhost:5000 > /dev/null; then
    print_status "Backend server started successfully"
else
    print_warning "Backend server might not be ready yet"
fi

print_info "Starting frontend server..."
print_info "Press Ctrl+C to stop both servers"
echo ""

# Start frontend
cd frontend
npm run dev &
FRONTEND_PID=$!

# Function to cleanup on exit
cleanup() {
    print_info "Stopping servers..."
    kill $BACKEND_PID 2>/dev/null || true
    kill $FRONTEND_PID 2>/dev/null || true
    print_status "Servers stopped"
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Wait for user to stop
print_status "Both servers are running!"
print_info "Backend: http://localhost:5000"
print_info "Frontend: http://localhost:3000 (or check terminal for actual port)"
print_info "Press Ctrl+C to stop both servers"
echo ""

# Wait for processes
wait
