#!/bin/bash

# MetaMind Platform Database Verification Script
# This script verifies that the database setup is working correctly

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
DB_HOST="localhost"
DB_PORT="5432"

echo -e "${BLUE}🔍 MetaMind Platform Database Verification${NC}"
echo -e "${BLUE}==========================================${NC}"

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

# Function to test database connection
test_connection() {
    print_info "Testing database connection..."
    if PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -c "SELECT version();" &> /dev/null; then
        print_status "Database connection successful"
        return 0
    else
        print_error "Database connection failed"
        return 1
    fi
}

# Function to check tables
check_tables() {
    print_info "Checking database tables..."
    
    local expected_tables=(
        "users"
        "careers"
        "mentors"
        "mentor_requests"
        "quizzes"
        "results"
        "questionnaire_questions"
        "questionnaire_answers"
        "user_career_recommendations"
        "user_roadmaps"
        "success_stories"
    )
    
    local missing_tables=()
    
    for table in "${expected_tables[@]}"; do
        if PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -c "SELECT 1 FROM $table LIMIT 1;" &> /dev/null; then
            print_status "Table '$table' exists"
        else
            print_error "Table '$table' is missing"
            missing_tables+=("$table")
        fi
    done
    
    if [ ${#missing_tables[@]} -eq 0 ]; then
        print_status "All required tables are present"
        return 0
    else
        print_error "Missing tables: ${missing_tables[*]}"
        return 1
    fi
}

# Function to check sample data
check_sample_data() {
    print_info "Checking sample data..."
    
    # Check careers
    local career_count=$(PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -t -c "SELECT COUNT(*) FROM careers;" | tr -d ' ')
    if [ "$career_count" -ge 3 ]; then
        print_status "Careers table has $career_count records (expected: 3+)"
    else
        print_warning "Careers table has only $career_count records (expected: 3+)"
    fi
    
    # Check mentors
    local mentor_count=$(PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -t -c "SELECT COUNT(*) FROM mentors;" | tr -d ' ')
    if [ "$mentor_count" -ge 3 ]; then
        print_status "Mentors table has $mentor_count records (expected: 3+)"
    else
        print_warning "Mentors table has only $mentor_count records (expected: 3+)"
    fi
    
    # Check questionnaire questions
    local question_count=$(PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -t -c "SELECT COUNT(*) FROM questionnaire_questions;" | tr -d ' ')
    if [ "$question_count" -ge 5 ]; then
        print_status "Questionnaire questions table has $question_count records (expected: 5+)"
    else
        print_warning "Questionnaire questions table has only $question_count records (expected: 5+)"
    fi
    
    # Check quizzes
    local quiz_count=$(PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -t -c "SELECT COUNT(*) FROM quizzes;" | tr -d ' ')
    if [ "$quiz_count" -ge 1 ]; then
        print_status "Quizzes table has $quiz_count records (expected: 1+)"
    else
        print_warning "Quizzes table has only $quiz_count records (expected: 1+)"
    fi
}

# Function to check .env file
check_env_file() {
    print_info "Checking .env file..."
    
    if [ -f "backend/.env" ]; then
        print_status ".env file exists"
        
        # Check for required variables
        local required_vars=("DATABASE_URL" "JWT_SECRET" "NODE_ENV" "PORT")
        local missing_vars=()
        
        for var in "${required_vars[@]}"; do
            if grep -q "^$var=" backend/.env; then
                print_status "Environment variable '$var' is set"
            else
                print_error "Environment variable '$var' is missing"
                missing_vars+=("$var")
            fi
        done
        
        if [ ${#missing_vars[@]} -eq 0 ]; then
            print_status "All required environment variables are present"
        else
            print_error "Missing environment variables: ${missing_vars[*]}"
        fi
        
        # Check for OpenAI API key
        if grep -q "OPENAI_API_KEY=your_openai_api_key_here" backend/.env; then
            print_warning "OpenAI API key needs to be updated in backend/.env"
        else
            print_status "OpenAI API key appears to be configured"
        fi
    else
        print_error ".env file is missing"
        return 1
    fi
}

# Function to check Node.js dependencies
check_dependencies() {
    print_info "Checking Node.js dependencies..."
    
    if [ -f "backend/package.json" ]; then
        print_status "package.json exists"
        
        if [ -d "backend/node_modules" ]; then
            print_status "Node.js dependencies are installed"
        else
            print_warning "Node.js dependencies are not installed. Run: cd backend && npm install"
        fi
    else
        print_error "package.json is missing"
        return 1
    fi
}

# Function to display summary
display_summary() {
    echo -e "\n${BLUE}📊 Verification Summary${NC}"
    echo -e "${BLUE}=======================${NC}"
    
    local total_checks=5
    local passed_checks=0
    
    # Count passed checks (this is a simplified version)
    if test_connection &> /dev/null; then
        ((passed_checks++))
    fi
    
    if check_tables &> /dev/null; then
        ((passed_checks++))
    fi
    
    if [ -f "backend/.env" ]; then
        ((passed_checks++))
    fi
    
    if [ -d "backend/node_modules" ]; then
        ((passed_checks++))
    fi
    
    if [ -f "backend/package.json" ]; then
        ((passed_checks++))
    fi
    
    echo -e "Checks passed: ${GREEN}$passed_checks${NC}/$total_checks"
    
    if [ $passed_checks -eq $total_checks ]; then
        echo -e "\n${GREEN}🎉 All checks passed! Your database setup is ready.${NC}"
        echo -e "\n${GREEN}Next steps:${NC}"
        echo -e "  1. Update ${YELLOW}backend/.env${NC} with your OpenAI API key"
        echo -e "  2. Start the backend: ${YELLOW}cd backend && npm run dev${NC}"
        echo -e "  3. Start the frontend: ${YELLOW}cd frontend && npm run dev${NC}"
    else
        echo -e "\n${YELLOW}⚠️  Some checks failed. Please review the output above.${NC}"
        echo -e "\n${GREEN}To fix issues:${NC}"
        echo -e "  1. Run the setup script again: ${YELLOW}./setup-database.sh${NC}"
        echo -e "  2. Check PostgreSQL is running"
        echo -e "  3. Verify all dependencies are installed"
    fi
}

# Main execution
main() {
    test_connection
    check_tables
    check_sample_data
    check_env_file
    check_dependencies
    display_summary
}

# Run main function
main "$@"
