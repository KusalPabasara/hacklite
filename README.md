# 🧠 MetaMind Platform - Career Guidance System

A comprehensive career guidance platform that helps users discover their ideal career path through intelligent quizzes, personalized roadmaps, and expert mentorship.

## 🔧 Recent Fixes & Improvements (Latest Session)

### ✅ **Critical Issues Resolved**
- **Registration System**: Fixed user registration with proper authentication and database integration
- **Quiz Intelligence**: Completely overhauled quiz system with intelligent career recommendations (no longer always suggests nursing)
- **Roadmap Functionality**: Fixed roadmap system with proper step tracking and career progression
- **Database Integration**: Improved PostgreSQL connections with proper error handling
- **Frontend/Backend Sync**: Resolved merge conflicts and ensured both servers run properly

### 🛠️ **Technical Changes Made**

#### Backend Improvements
1. **Quiz Controller Enhancement** (`backend/src/controllers/quizController.js`)
   - Implemented intelligent scoring algorithm for Technology/Healthcare/Design careers
   - Added context-aware question analysis
   - Enhanced career recommendation logic with detailed scoring breakdown

2. **Roadmap Controller Fixes** (`backend/src/controllers/roadmapController.js`)
   - Fixed roadmap data handling for both string and array formats
   - Improved error handling and user feedback
   - Enhanced progress tracking functionality

3. **Quiz Routes Update** (`backend/src/routes/quizRoutes.js`)
   - Made quiz listing public (no authentication required)
   - Maintained authentication for quiz submission and results

4. **Roadmap Model Improvements** (`backend/src/models/roadmapModel.js`)
   - Added proper error handling in saveUserRoadmap function
   - Fixed database query issues
   - Improved data validation

#### Database Configuration
- Created proper `.env` file with PostgreSQL credentials
- Fixed database connection string format
- Verified all database tables and relationships

#### Frontend/Backend Integration
- Resolved merge conflicts in multiple files
- Ensured both servers run on correct ports (Backend: 5000, Frontend: 5173)
- Fixed authentication flow between frontend and backend

### 🧪 **Testing & Verification**
- ✅ User registration and login functionality
- ✅ Quiz submission with accurate career recommendations
- ✅ Roadmap creation and progress tracking
- ✅ Database connectivity and data persistence
- ✅ API endpoint functionality

### 📊 **Before vs After**
| Issue | Before | After |
|-------|--------|-------|
| Quiz Recommendations | Always suggested "Nursing" | Intelligent scoring for Technology/Healthcare/Design |
| Registration | Database connection issues | Proper authentication with PostgreSQL |
| Roadmap | Broken step tracking | Full roadmap functionality with progress |
| Database | Connection failures | Stable PostgreSQL integration |
| Frontend | Merge conflicts | Clean, working React application |

### 🎯 **Core Features**
- **Smart Career Quizzes**: Intelligent assessment that analyzes answers to recommend appropriate careers
- **Personalized Roadmaps**: Step-by-step career progression guides
- **Career Exploration**: Detailed information about various career paths
- **Mentor Matching**: Connect with industry professionals
- **Success Stories**: Inspiring career journey narratives
- **Leaderboard**: Gamified learning experience
- **Multi-language Support**: English and Sinhala language support

### 🏢 **Supported Career Categories**
- **Technology**: Software Engineer, Data Scientist, Software Developer
- **Healthcare**: Nurse
- **Design**: UI/UX Designer

## 🛠️ Technology Stack

### Backend
- **Node.js** with Express.js
- **PostgreSQL** database
- **JWT** authentication
- **bcrypt** password hashing
- **CORS** enabled for frontend integration

### Frontend
- **React** with Vite
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Context API** for state management
- **i18next** for internationalization

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn

### Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
JWT_SECRET=your_jwt_secret_here
NODE_ENV=development
```

Start the backend server:
```bash
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
```

Start the frontend development server:
```bash
npm run dev
```

## 🗄️ Complete PostgreSQL Database Setup

### Quick Setup Commands
```bash
# 1. Create PostgreSQL user and database
sudo -u postgres createuser --interactive myuser
sudo -u postgres createdb mydb

# 2. Set password for user (when prompted, enter: mypassword)
sudo -u postgres psql -c "ALTER USER myuser PASSWORD 'mypassword';"

# 3. Grant privileges
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE mydb TO myuser;"
```

### Complete Database Schema Setup
```sql
-- Connect to database
psql -U myuser -d mydb -h localhost

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'student',
    language TEXT DEFAULT 'en'
);

-- 2. Careers table
CREATE TABLE careers (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT,
    description TEXT,
    roadmap JSONB
);

-- 3. Quizzes table
CREATE TABLE quizzes (
    id SERIAL PRIMARY KEY,
    type TEXT,
    title TEXT,
    questions JSONB
);

-- 4. Results table
CREATE TABLE results (
    id SERIAL PRIMARY KEY,
    quiz_id INTEGER REFERENCES quizzes(id),
    user_id UUID REFERENCES users(id),
    answers JSONB,
    suggestions TEXT[]
);

-- 5. User Roadmaps table
CREATE TABLE user_roadmaps (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    career_id INTEGER REFERENCES careers(id),
    current_step INTEGER DEFAULT 0,
    completed BOOLEAN DEFAULT false,
    roadmap_override JSONB
);

-- 6. Mentors table
CREATE TABLE mentors (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    bio TEXT,
    expertise TEXT[],
    photo_url TEXT
);

-- 7. Mentor Requests table
CREATE TABLE mentor_requests (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    mentor_id INTEGER REFERENCES mentors(id),
    note TEXT,
    created_at TIMESTAMP DEFAULT now()
);

-- 8. Success Stories table
CREATE TABLE success_stories (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    title TEXT,
    story TEXT,
    career TEXT,
    created_at TIMESTAMP DEFAULT now()
);

-- 9. Leaderboard table
CREATE TABLE leaderboard (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    score INTEGER DEFAULT 0,
    rank INTEGER,
    career TEXT
);

-- 10. Progress table
CREATE TABLE progress (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    career_id INTEGER REFERENCES careers(id),
    step_completed INTEGER DEFAULT 0,
    total_steps INTEGER,
    completed_at TIMESTAMP DEFAULT now()
);

-- 11. Career Templates table
CREATE TABLE career_templates (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT,
    template_data JSONB
);
```

### Sample Data Insertion
```sql
-- Insert sample careers
INSERT INTO careers (title, category, description, roadmap) VALUES
('Software Engineer', 'Technology', 'Build, test, and maintain software systems.', '["Learn JavaScript", "Learn Git & GitHub", "Build 3 projects", "Apply for internships"]'),
('Nurse', 'Healthcare', 'Provide care to patients in hospitals or clinics.', '["A/L Biology", "Nursing school exam", "Training", "MOH Registration"]'),
('Data Scientist', 'Technology', 'Analyze data to extract insights', '[{"step": 1, "title": "Learn Statistics", "description": "Understand probability and statistics"}, {"step": 2, "title": "Programming Skills", "description": "Learn Python or R"}, {"step": 3, "title": "Machine Learning", "description": "Learn ML algorithms and libraries"}, {"step": 4, "title": "Data Visualization", "description": "Learn tools like Tableau or Matplotlib"}, {"step": 5, "title": "Real Projects", "description": "Work on data science projects"}]'),
('UI/UX Designer', 'Design', 'Create user-friendly interfaces', '[{"step": 1, "title": "Design Principles", "description": "Learn color theory and typography"}, {"step": 2, "title": "Design Tools", "description": "Master Figma, Sketch, or Adobe XD"}, {"step": 3, "title": "User Research", "description": "Learn user testing and research methods"}, {"step": 4, "title": "Prototyping", "description": "Create interactive prototypes"}, {"step": 5, "title": "Portfolio", "description": "Build a strong design portfolio"}]'),
('Software Developer', 'Technology', 'Build applications and software solutions', '[{"step": 1, "title": "Learn Programming Basics", "description": "Start with HTML, CSS, and JavaScript"}, {"step": 2, "title": "Choose a Framework", "description": "Learn React, Vue, or Angular"}, {"step": 3, "title": "Backend Development", "description": "Learn Node.js, Python, or Java"}, {"step": 4, "title": "Database Management", "description": "Learn SQL and database design"}, {"step": 5, "title": "Build Projects", "description": "Create portfolio projects"}]');

-- Insert sample quizzes
INSERT INTO quizzes (type, title, questions) VALUES
('interest', 'Career Interest Quiz', '[{"q": "Do you like computers?", "options": ["Yes", "No"]}, {"q": "Do you enjoy helping people?", "options": ["Yes", "No"]}, {"q": "Do you like working with tools?", "options": ["Yes", "No"]}, {"q": "Do you enjoy creativity?", "options": ["Yes", "No"]}]'),
('interest', 'Find Your Fit Quiz', '[{"q": "Do you enjoy solving problems?", "options": ["Yes", "No"]}, {"q": "Do you like helping people?", "options": ["Yes", "No"]}, {"q": "Are you creative?", "options": ["Yes", "No"]}]'),
('career', 'Career Interest Assessment', '[{"q": "What type of work environment do you prefer?", "options": ["Collaborative team setting", "Independent work", "Creative studio", "Corporate office"]}, {"q": "Which activity interests you most?", "options": ["Problem solving", "Creative design", "Data analysis", "Helping others"]}, {"q": "What motivates you at work?", "options": ["Financial success", "Making a difference", "Learning new things", "Recognition"]}]'),
('technical', 'Technical Skills Assessment', '[{"q": "How comfortable are you with programming?", "options": ["Beginner", "Intermediate", "Advanced", "Expert"]}, {"q": "Which technology interests you most?", "options": ["Web Development", "Mobile Apps", "Data Science", "AI/ML"]}]');

-- Insert sample mentors
INSERT INTO mentors (name, bio, expertise, photo_url) VALUES
('Dr. Sarah Johnson', 'Senior Software Engineer with 10+ years experience in full-stack development', '{"JavaScript", "React", "Node.js", "Python"}', 'https://example.com/sarah.jpg'),
('Prof. Michael Chen', 'Data Science expert and university professor', '{"Python", "Machine Learning", "Statistics", "R"}', 'https://example.com/michael.jpg'),
('Lisa Rodriguez', 'UI/UX Designer with expertise in user research and design systems', '{"Figma", "User Research", "Prototyping", "Design Systems"}', 'https://example.com/lisa.jpg');

-- Insert sample success stories
INSERT INTO success_stories (user_id, title, story, career) VALUES
(gen_random_uuid(), 'From Zero to Software Engineer', 'Started with no coding experience and now working at a tech company', 'Software Engineer'),
(gen_random_uuid(), 'Nursing Journey', 'Overcame challenges to become a registered nurse', 'Nurse'),
(gen_random_uuid(), 'Data Science Success', 'Transitioned from business to data science career', 'Data Scientist');
```

### Environment Configuration
Create a `.env` file in the backend directory:
```env
PORT=5000
DATABASE_URL=postgresql://myuser:mypassword@localhost:5432/mydb
JWT_SECRET=your_jwt_secret_here
NODE_ENV=development
```

### Database Verification
```bash
# Test database connection
psql -U myuser -d mydb -h localhost -c "SELECT COUNT(*) FROM careers;"
psql -U myuser -d mydb -h localhost -c "SELECT COUNT(*) FROM quizzes;"
psql -U myuser -d mydb -h localhost -c "SELECT COUNT(*) FROM mentors;"
```

### Key Tables Summary
- `users` - User accounts and authentication (UUID primary key)
- `careers` - Career information and roadmaps (7 sample careers)
- `quizzes` - Quiz questions and structure (4 sample quizzes)
- `results` - Quiz results and recommendations
- `user_roadmaps` - User's career progress tracking
- `mentors` - Mentor profiles and availability (3 sample mentors)
- `success_stories` - Inspirational career stories (3 sample stories)
- `leaderboard` - User rankings and scores
- `progress` - User progress tracking
- `mentor_requests` - Mentor connection requests
- `career_templates` - Career template data

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Quizzes
- `GET /api/quizzes` - Get all available quizzes
- `GET /api/quizzes/:id` - Get specific quiz
- `POST /api/quizzes/:id/submit` - Submit quiz answers

### Careers
- `GET /api/careers` - Get all careers
- `GET /api/careers/:id` - Get specific career details

### Roadmap
- `POST /api/roadmap/select` - Set career goal
- `GET /api/roadmap/` - Get user's roadmap
- `PUT /api/roadmap/progress` - Update progress

## 🎯 Quiz Intelligence

The quiz system now uses advanced scoring algorithms to provide accurate career recommendations:

### Scoring System
- **Technology Score**: Based on computer/programming interests
- **Healthcare Score**: Based on helping people interests
- **Design Score**: Based on creativity interests

### Career Recommendations
- Analyzes question context and user answers
- Provides specific career suggestions
- Returns detailed scoring breakdown
- Suggests appropriate career categories

## 🗺️ Roadmap System

### Features
- **Career Selection**: Choose target career path
- **Step Tracking**: Track progress through career steps
- **Progress Updates**: Mark completed milestones
- **Dynamic Roadmaps**: Different roadmaps for different careers

### Roadmap Structure
```json
{
  "career": "Software Engineer",
  "steps": [
    "Learn JavaScript",
    "Learn Git & GitHub", 
    "Build 3 projects",
    "Apply for internships"
  ],
  "currentStep": 0,
  "completed": false
}
```

## 🌐 Deployment

### Environment Variables
Ensure all environment variables are properly set:
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (default: 5000)

### Production Considerations
- Use environment-specific database configurations
- Set up proper CORS policies
- Configure SSL certificates
- Set up monitoring and logging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please open an issue in the GitHub repository.

---

**MetaMind Platform** - Empowering career decisions through intelligent guidance 🚀
