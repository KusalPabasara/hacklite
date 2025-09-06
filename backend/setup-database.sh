#!/bin/bash

# MetaMind Platform Database Setup Script
# This script sets up PostgreSQL database from scratch for the MetaMind Platform

set -e  # Exit on any error

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

echo -e "${BLUE}🚀 MetaMind Platform Database Setup${NC}"
echo -e "${BLUE}====================================${NC}"

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

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   print_error "This script should not be run as root for security reasons"
   exit 1
fi

# Detect OS
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    OS="linux"
elif [[ "$OSTYPE" == "darwin"* ]]; then
    OS="macos"
else
    print_error "Unsupported operating system: $OSTYPE"
    exit 1
fi

print_info "Detected OS: $OS"

# Function to install PostgreSQL on Linux
install_postgresql_linux() {
    print_info "Installing PostgreSQL on Linux..."
    
    # Update package list
    sudo apt update
    
    # Install PostgreSQL
    sudo apt install -y postgresql postgresql-contrib
    
    # Start and enable PostgreSQL service
    sudo systemctl start postgresql
    sudo systemctl enable postgresql
    
    print_status "PostgreSQL installed successfully"
}

# Function to install PostgreSQL on macOS
install_postgresql_macos() {
    print_info "Installing PostgreSQL on macOS..."
    
    # Check if Homebrew is installed
    if ! command -v brew &> /dev/null; then
        print_info "Installing Homebrew..."
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    fi
    
    # Install PostgreSQL
    brew install postgresql@15
    
    # Start PostgreSQL service
    brew services start postgresql@15
    
    print_status "PostgreSQL installed successfully"
}

# Function to check if PostgreSQL is installed
check_postgresql() {
    if command -v psql &> /dev/null; then
        print_status "PostgreSQL is already installed"
        return 0
    else
        print_warning "PostgreSQL is not installed"
        return 1
    fi
}

# Function to check if PostgreSQL service is running
check_postgresql_service() {
    if [[ "$OS" == "linux" ]]; then
        if sudo systemctl is-active --quiet postgresql; then
            print_status "PostgreSQL service is running"
            return 0
        else
            print_warning "PostgreSQL service is not running"
            return 1
        fi
    elif [[ "$OS" == "macos" ]]; then
        if brew services list | grep postgresql@15 | grep started &> /dev/null; then
            print_status "PostgreSQL service is running"
            return 0
        else
            print_warning "PostgreSQL service is not running"
            return 1
        fi
    fi
}

# Function to create database and user
create_database_and_user() {
    print_info "Creating database and user..."
    
    # Add PostgreSQL to PATH for macOS
    if [[ "$OS" == "macos" ]]; then
        export PATH="/opt/homebrew/opt/postgresql@15/bin:$PATH"
    fi
    
    # Create database and user (different approach for macOS vs Linux)
    if [[ "$OS" == "macos" ]]; then
        # On macOS with Homebrew, connect directly as current user
        psql postgres << EOF
-- Create user
CREATE USER $DB_USER WITH PASSWORD '$DB_PASSWORD';

-- Create database
CREATE DATABASE $DB_NAME OWNER $DB_USER;

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;

-- Connect to the database and grant schema privileges
\c $DB_NAME;
GRANT ALL ON SCHEMA public TO $DB_USER;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO $DB_USER;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO $DB_USER;

-- Set default privileges for future tables
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO $DB_USER;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO $DB_USER;

\q
EOF
    else
        # On Linux, use sudo -u postgres
        sudo -u postgres psql << EOF
-- Create user
CREATE USER $DB_USER WITH PASSWORD '$DB_PASSWORD';

-- Create database
CREATE DATABASE $DB_NAME OWNER $DB_USER;

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;

-- Connect to the database and grant schema privileges
\c $DB_NAME;
GRANT ALL ON SCHEMA public TO $DB_USER;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO $DB_USER;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO $DB_USER;

-- Set default privileges for future tables
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO $DB_USER;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO $DB_USER;

\q
EOF
    fi
    
    print_status "Database and user created successfully"
}

# Function to create database schema
create_database_schema() {
    print_info "Creating database schema..."
    
    # Create the schema SQL file
    cat > /tmp/metamind_schema.sql << 'EOF'
-- MetaMind Platform Database Schema
-- This file contains all the required tables for the MetaMind Platform

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    language VARCHAR(10) DEFAULT 'en',
    questionnaire_completed BOOLEAN DEFAULT FALSE,
    questionnaire_completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Careers table
CREATE TABLE IF NOT EXISTS careers (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    roadmap JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Mentors table
CREATE TABLE IF NOT EXISTS mentors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    bio TEXT,
    expertise TEXT,
    photo_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Mentor requests table
CREATE TABLE IF NOT EXISTS mentor_requests (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    mentor_id INTEGER REFERENCES mentors(id) ON DELETE CASCADE,
    note TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Quizzes table
CREATE TABLE IF NOT EXISTS quizzes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    questions JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Results table
CREATE TABLE IF NOT EXISTS results (
    id SERIAL PRIMARY KEY,
    quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    answers JSONB NOT NULL,
    suggestions JSONB,
    score INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Questionnaire questions table
CREATE TABLE IF NOT EXISTS questionnaire_questions (
    id SERIAL PRIMARY KEY,
    question_text TEXT NOT NULL,
    question_type VARCHAR(50) NOT NULL,
    options JSONB,
    career_weight JSONB,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Questionnaire answers table
CREATE TABLE IF NOT EXISTS questionnaire_answers (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    question_id INTEGER REFERENCES questionnaire_questions(id) ON DELETE CASCADE,
    answer JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, question_id)
);

-- User career recommendations table
CREATE TABLE IF NOT EXISTS user_career_recommendations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    career_id INTEGER REFERENCES careers(id) ON DELETE CASCADE,
    match_score DECIMAL(5,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, career_id)
);

-- User roadmaps table
CREATE TABLE IF NOT EXISTS user_roadmaps (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    career_id INTEGER REFERENCES careers(id) ON DELETE CASCADE,
    current_step INTEGER DEFAULT 0,
    completed BOOLEAN DEFAULT FALSE,
    roadmap_override JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id)
);

-- Success stories table
CREATE TABLE IF NOT EXISTS success_stories (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    career_title VARCHAR(255) NOT NULL,
    quote TEXT,
    full_story TEXT,
    photo_url VARCHAR(500),
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_careers_category ON careers(category);
CREATE INDEX IF NOT EXISTS idx_mentor_requests_user_id ON mentor_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_mentor_requests_mentor_id ON mentor_requests(mentor_id);
CREATE INDEX IF NOT EXISTS idx_results_user_id ON results(user_id);
CREATE INDEX IF NOT EXISTS idx_results_quiz_id ON results(quiz_id);
CREATE INDEX IF NOT EXISTS idx_questionnaire_answers_user_id ON questionnaire_answers(user_id);
CREATE INDEX IF NOT EXISTS idx_user_career_recommendations_user_id ON user_career_recommendations(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roadmaps_user_id ON user_roadmaps(user_id);
CREATE INDEX IF NOT EXISTS idx_success_stories_user_id ON success_stories(user_id);
CREATE INDEX IF NOT EXISTS idx_success_stories_verified ON success_stories(is_verified);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_careers_updated_at BEFORE UPDATE ON careers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_mentors_updated_at BEFORE UPDATE ON mentors FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_mentor_requests_updated_at BEFORE UPDATE ON mentor_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_quizzes_updated_at BEFORE UPDATE ON quizzes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_roadmaps_updated_at BEFORE UPDATE ON user_roadmaps FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_success_stories_updated_at BEFORE UPDATE ON success_stories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
EOF

    # Execute the schema
    PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f /tmp/metamind_schema.sql
    
    print_status "Database schema created successfully"
}

# Function to insert sample data
insert_sample_data() {
    print_info "Inserting sample data..."
    
    # Create sample data SQL file
    cat > /tmp/metamind_sample_data.sql << 'EOF'
-- Sample data for MetaMind Platform

-- Insert sample careers (from update-careers.sql)
INSERT INTO careers (title, category, description, roadmap) VALUES 
('NTS - Nursing Training School', 'Healthcare', 'Professional nursing training program for healthcare professionals in Sri Lanka', 
'[
  {"step": 1, "title": "Complete A/L Biology", "description": "Finish Advanced Level Biology with good grades (minimum 3 passes including Biology)"},
  {"step": 2, "title": "Meet Entry Requirements", "description": "Ensure you meet age requirements (17-25 years) and health standards"},
  {"step": 3, "title": "Apply for NTS", "description": "Submit application to Nursing Training School with required documents"},
  {"step": 4, "title": "Entrance Examination", "description": "Pass the competitive NTS entrance examination (Biology, English, General Knowledge)"},
  {"step": 5, "title": "Interview Process", "description": "Attend interview and medical examination if selected"},
  {"step": 6, "title": "3-Year Training Program", "description": "Complete comprehensive nursing training including theory and clinical practice"},
  {"step": 7, "title": "Clinical Rotations", "description": "Complete clinical rotations in various hospital departments"},
  {"step": 8, "title": "Final Examinations", "description": "Pass all theoretical and practical examinations"},
  {"step": 9, "title": "MOH Registration", "description": "Register with Ministry of Health as a qualified nurse"},
  {"step": 10, "title": "Start Nursing Career", "description": "Begin your professional nursing career in hospitals or healthcare facilities"}
]'),

('VTA - Vocational Training Authority', 'Technical', 'Technical and vocational training for various skilled trades across Sri Lanka',
'[
  {"step": 1, "title": "Complete O/L Education", "description": "Finish Ordinary Level education with basic passes"},
  {"step": 2, "title": "Choose Your Trade", "description": "Select from available trades: Electrical, Plumbing, Welding, Automotive, Construction, etc."},
  {"step": 3, "title": "Visit VTA Center", "description": "Visit nearest VTA center (island-wide network) for course information"},
  {"step": 4, "title": "Apply Online/Offline", "description": "Apply through VTA website (course.vta.lk) or visit center directly"},
  {"step": 5, "title": "Course Selection", "description": "Choose between Full-time (3-18 months) or Part-time (1-12 months) courses"},
  {"step": 6, "title": "NVQ/NON-NVQ Training", "description": "Complete National Vocational Qualification or Non-NVQ training program"},
  {"step": 7, "title": "Practical Training", "description": "Hands-on training in workshops and real-world projects"},
  {"step": 8, "title": "Assessment & Testing", "description": "Complete practical and theoretical assessments"},
  {"step": 9, "title": "VTA Certification", "description": "Obtain official VTA certification upon successful completion"},
  {"step": 10, "title": "Job Placement Support", "description": "Access VTA job placement services and start your technical career"}
]'),

('German Technical Training', 'Technical', 'Advanced technical training with German standards and international certification',
'[
  {"step": 1, "title": "Meet Entry Requirements", "description": "Complete O/L with good grades in Mathematics and Science subjects"},
  {"step": 2, "title": "Choose Specialization", "description": "Select from: Automobile Mechanic, Electrician, Machinist, Welder, Industrial Mechatronics, etc."},
  {"step": 3, "title": "Apply to CGTTI", "description": "Apply to Ceylon German Technical Training Institute (Moratuwa, Borella, or Anamaduwa)"},
  {"step": 4, "title": "Entrance Assessment", "description": "Pass entrance examination and interview process"},
  {"step": 5, "title": "German Language Training", "description": "Complete German language course (B1 level) for international opportunities"},
  {"step": 6, "title": "Full-Time Training", "description": "Complete comprehensive full-time training program (varies by specialization)"},
  {"step": 7, "title": "Practical Workshops", "description": "Hands-on training in modern workshops with German-standard equipment"},
  {"step": 8, "title": "Industrial Training", "description": "Complete industrial training and internships with partner companies"},
  {"step": 9, "title": "German Certification", "description": "Obtain internationally recognized German technical certification"},
  {"step": 10, "title": "Career Opportunities", "description": "Access local and international job opportunities with German companies"}
]');

-- Insert sample mentors
INSERT INTO mentors (name, bio, expertise, photo_url) VALUES 
('Dr. Sarah Perera', 'Experienced healthcare professional with 15+ years in nursing education and practice.', 'Healthcare, Nursing, Medical Training', 'https://via.placeholder.com/150'),
('Eng. Ravi Silva', 'Senior technical trainer with expertise in vocational education and skill development.', 'Technical Training, Vocational Education, Skill Development', 'https://via.placeholder.com/150'),
('Mr. Hans Mueller', 'German technical expert specializing in advanced manufacturing and industrial training.', 'German Technical Training, Manufacturing, Industrial Skills', 'https://via.placeholder.com/150');

-- Insert sample questionnaire questions
INSERT INTO questionnaire_questions (question_text, question_type, options, career_weight, order_index) VALUES 
('What is your highest level of education?', 'single_choice', 
'{"options": ["olevels", "alevels", "diploma", "degree", "masters"]}',
'{"nts": {"olevels": 0.2, "alevels": 0.9, "diploma": 0.8, "degree": 0.9, "masters": 0.7}, "vta": {"olevels": 0.9, "alevels": 0.8, "diploma": 0.7, "degree": 0.6, "masters": 0.5}, "german_tech": {"olevels": 0.8, "alevels": 0.9, "diploma": 0.8, "degree": 0.7, "masters": 0.6}}',
1),

('What subjects do you enjoy most?', 'multiple_choice',
'{"options": ["Mathematics", "Science", "Biology", "Chemistry", "Physics", "English", "History", "Art", "Technical Drawing"]}',
'{"nts": {"Biology": 0.9, "Chemistry": 0.8, "Science": 0.8, "Mathematics": 0.6, "English": 0.7}, "vta": {"Mathematics": 0.8, "Science": 0.7, "Physics": 0.8, "Technical Drawing": 0.9, "Chemistry": 0.6}, "german_tech": {"Mathematics": 0.9, "Physics": 0.9, "Science": 0.8, "Technical Drawing": 0.8, "Chemistry": 0.7}}',
2),

('What type of work environment do you prefer?', 'single_choice',
'{"options": ["Healthcare/Hospital", "Workshop/Factory", "Office", "Outdoor/Field", "Laboratory"]}',
'{"nts": {"Healthcare/Hospital": 0.9, "Laboratory": 0.7, "Office": 0.5}, "vta": {"Workshop/Factory": 0.9, "Outdoor/Field": 0.7, "Laboratory": 0.6}, "german_tech": {"Workshop/Factory": 0.9, "Laboratory": 0.8, "Office": 0.6}}',
3),

('How do you prefer to learn?', 'single_choice',
'{"options": ["Hands-on practice", "Theoretical study", "Group work", "Individual study", "Visual learning"]}',
'{"nts": {"Hands-on practice": 0.8, "Theoretical study": 0.7, "Group work": 0.6}, "vta": {"Hands-on practice": 0.9, "Visual learning": 0.8, "Group work": 0.7}, "german_tech": {"Hands-on practice": 0.9, "Theoretical study": 0.7, "Visual learning": 0.8}}',
4),

('What are your career goals?', 'multiple_choice',
'{"options": ["Help people", "Build/create things", "Solve technical problems", "Work internationally", "Start own business", "Work in healthcare", "Work in technology"]}',
'{"nts": {"Help people": 0.9, "Work in healthcare": 0.9, "Solve technical problems": 0.6}, "vta": {"Build/create things": 0.9, "Solve technical problems": 0.8, "Start own business": 0.7}, "german_tech": {"Work internationally": 0.9, "Solve technical problems": 0.9, "Work in technology": 0.8, "Build/create things": 0.8}}',
5);

-- Insert sample quiz
INSERT INTO quizzes (title, description, questions) VALUES 
('Career Aptitude Test', 'A comprehensive test to help determine your career interests and aptitudes',
'[
  {"q": "Which activity interests you most?", "options": ["Helping sick people", "Building furniture", "Programming computers", "Teaching others", "Managing projects"]},
  {"q": "What would you rather do on a weekend?", "options": ["Volunteer at a hospital", "Fix something broken", "Learn new software", "Read educational books", "Plan an event"]},
  {"q": "Which skill would you like to develop?", "options": ["Medical procedures", "Technical craftsmanship", "Digital technology", "Communication", "Leadership"]},
  {"q": "What motivates you most?", "options": ["Making a difference in lives", "Creating something tangible", "Solving complex problems", "Sharing knowledge", "Achieving goals"]},
  {"q": "Which work environment appeals to you?", "options": ["Hospital/Clinic", "Workshop/Garage", "Tech office", "Classroom", "Corporate office"]}
]');

EOF

    # Execute the sample data
    PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f /tmp/metamind_sample_data.sql
    
    print_status "Sample data inserted successfully"
}

# Function to create .env file
create_env_file() {
    print_info "Creating .env file..."
    
    # Create .env file in backend directory
    cat > backend/.env << EOF
# MetaMind Platform Environment Variables
PORT=5000
DATABASE_URL=postgresql://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME
JWT_SECRET=metamind_super_secret_jwt_key_2024_$(openssl rand -hex 16)
NODE_ENV=development

# OpenAI API Key (add your own key)
OPENAI_API_KEY=your_openai_api_key_here

# Other configuration
CORS_ORIGIN=http://localhost:3000
EOF
    
    print_status ".env file created successfully"
    print_warning "Please update the OPENAI_API_KEY in backend/.env with your actual OpenAI API key"
}

# Function to install Node.js dependencies
install_dependencies() {
    print_info "Installing Node.js dependencies..."
    
    cd backend
    npm install
    cd ..
    
    print_status "Node.js dependencies installed successfully"
}

# Function to test database connection
test_database_connection() {
    print_info "Testing database connection..."
    
    # Test connection
    if PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -c "SELECT version();" &> /dev/null; then
        print_status "Database connection test successful"
        return 0
    else
        print_error "Database connection test failed"
        return 1
    fi
}

# Function to display final information
display_final_info() {
    echo -e "\n${GREEN}🎉 Database setup completed successfully!${NC}"
    echo -e "${BLUE}====================================${NC}"
    echo -e "${GREEN}Database Information:${NC}"
    echo -e "  Database Name: ${YELLOW}$DB_NAME${NC}"
    echo -e "  Database User: ${YELLOW}$DB_USER${NC}"
    echo -e "  Database Host: ${YELLOW}$DB_HOST${NC}"
    echo -e "  Database Port: ${YELLOW}$DB_PORT${NC}"
    echo -e "\n${GREEN}Next Steps:${NC}"
    echo -e "  1. Update ${YELLOW}backend/.env${NC} with your OpenAI API key"
    echo -e "  2. Start the backend server: ${YELLOW}cd backend && npm run dev${NC}"
    echo -e "  3. Start the frontend: ${YELLOW}cd frontend && npm run dev${NC}"
    echo -e "\n${GREEN}Database Tables Created:${NC}"
    echo -e "  • users (user management)"
    echo -e "  • careers (career information)"
    echo -e "  • mentors (mentor profiles)"
    echo -e "  • mentor_requests (mentorship requests)"
    echo -e "  • quizzes (quiz data)"
    echo -e "  • results (quiz results)"
    echo -e "  • questionnaire_questions (questionnaire questions)"
    echo -e "  • questionnaire_answers (user answers)"
    echo -e "  • user_career_recommendations (career recommendations)"
    echo -e "  • user_roadmaps (roadmap tracking)"
    echo -e "  • success_stories (success stories)"
    echo -e "\n${GREEN}Sample Data Included:${NC}"
    echo -e "  • 3 career paths (NTS, VTA, German Technical)"
    echo -e "  • 3 sample mentors"
    echo -e "  • 5 questionnaire questions"
    echo -e "  • 1 sample quiz"
    echo -e "\n${BLUE}Happy coding! 🚀${NC}"
}

# Main execution
main() {
    # Check if PostgreSQL is installed
    if ! check_postgresql; then
        print_info "Installing PostgreSQL..."
        if [[ "$OS" == "linux" ]]; then
            install_postgresql_linux
        elif [[ "$OS" == "macos" ]]; then
            install_postgresql_macos
        fi
    fi
    
    # Check if PostgreSQL service is running
    if ! check_postgresql_service; then
        print_info "Starting PostgreSQL service..."
        if [[ "$OS" == "linux" ]]; then
            sudo systemctl start postgresql
        elif [[ "$OS" == "macos" ]]; then
            brew services start postgresql@15
        fi
    fi
    
    # Create database and user
    create_database_and_user
    
    # Create database schema
    create_database_schema
    
    # Insert sample data
    insert_sample_data
    
    # Create .env file
    create_env_file
    
    # Install dependencies
    install_dependencies
    
    # Test database connection
    if test_database_connection; then
        display_final_info
    else
        print_error "Setup completed but database connection test failed"
        print_info "Please check your PostgreSQL installation and try again"
        exit 1
    fi
    
    # Clean up temporary files
    rm -f /tmp/metamind_schema.sql /tmp/metamind_sample_data.sql
}

# Run main function
main "$@"
