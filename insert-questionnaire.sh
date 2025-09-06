#!/bin/bash

# MetaMind Platform - Insert Questionnaire Questions Script
# This script inserts all questionnaire questions into the database

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
DB_NAME="metamind_db"
DB_USER="metamind_user"
DB_PASSWORD="metamind_password_2024"

echo -e "${BLUE}📝 MetaMind Platform - Inserting Questionnaire Questions${NC}"
echo -e "${BLUE}====================================================${NC}"

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

# Check if SQL file exists
if [[ ! -f "insert-questionnaire-questions.sql" ]]; then
    print_error "SQL file not found: insert-questionnaire-questions.sql"
    exit 1
fi

# Check if PostgreSQL is running
print_info "Checking PostgreSQL connection..."
if ! psql -d postgres -c "SELECT 1;" &> /dev/null; then
    print_error "PostgreSQL is not running or not accessible"
    print_info "Please start PostgreSQL first:"
    echo "  brew services start postgresql@15"
    exit 1
fi

# Check if database exists
print_info "Checking if database exists..."
if ! psql -d postgres -lqt | cut -d \| -f 1 | grep -qw $DB_NAME; then
    print_error "Database $DB_NAME does not exist"
    print_info "Please run the database setup first:"
    echo "  ./fix-postgres-connection.sh"
    exit 1
fi

# Insert questionnaire questions
print_info "Inserting questionnaire questions..."
PGPASSWORD=$DB_PASSWORD psql -h localhost -p 5432 -U $DB_USER -d $DB_NAME -f insert-questionnaire-questions.sql

if [ $? -eq 0 ]; then
    print_status "Questionnaire questions inserted successfully!"
    
    # Show summary
    echo ""
    print_info "Questionnaire Summary:"
    PGPASSWORD=$DB_PASSWORD psql -h localhost -p 5432 -U $DB_USER -d $DB_NAME -c "
    SELECT 
        'Total Questions: ' || COUNT(*) as summary
    FROM questionnaire_questions;
    
    SELECT 
        'Question ' || order_index || ': ' || LEFT(question_text, 50) || '...' as questions
    FROM questionnaire_questions 
    ORDER BY order_index;
    "
    
    echo ""
    print_status "Your friend can now complete the questionnaire when they first log in!"
    print_info "The questionnaire includes:"
    echo "  • Education level assessment"
    echo "  • Subject interests evaluation"
    echo "  • Work environment preferences"
    echo "  • Learning style assessment"
    echo "  • Career goals analysis"
    echo "  • Skills confidence check"
    echo "  • Work schedule preferences"
    echo "  • Career values assessment"
    echo "  • Stress tolerance evaluation"
    echo "  • Future aspirations planning"
    
else
    print_error "Failed to insert questionnaire questions"
    exit 1
fi

echo ""
print_info "Next steps:"
echo "  1. Start the backend: cd backend && npm run dev"
echo "  2. Start the frontend: cd frontend && npm run dev"
echo "  3. Your friend can now register and complete the questionnaire!"
