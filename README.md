# MetaMind Platform - Career Guidance System

A comprehensive career guidance platform that helps users discover their ideal career path through intelligent quizzes, personalized roadmaps, and expert mentorship. The platform focuses on Sri Lankan career opportunities including NTS (Nursing Training School), VTA (Vocational Training Authority), and German Technical Training programs.

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher)
- **PostgreSQL** (v12 or higher)
- **npm** or **yarn**

### 1. Clone the Repository
```bash
git clone https://github.com/KusalPabasara/hacklite.git
cd hacklite
```

### 2. Database Setup

#### Install PostgreSQL
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install postgresql postgresql-contrib

# macOS (using Homebrew)
brew install postgresql
brew services start postgresql

# Windows
# Download and install from https://www.postgresql.org/download/windows/
```

#### Create Database and User
```bash
# Switch to postgres user
sudo -u postgres psql

# Create user and database
CREATE USER myuser WITH PASSWORD 'mypassword';
CREATE DATABASE mydb OWNER myuser;
GRANT ALL PRIVILEGES ON DATABASE mydb TO myuser;

# Exit psql
\q
```

#### Initialize Database Schema
```bash
# Connect to database
psql -U myuser -d mydb -h localhost

# Run the following SQL commands:
```

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'student',
    language TEXT DEFAULT 'en',
    created_at TIMESTAMP DEFAULT now()
);

-- User profiles table
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    full_name TEXT,
    email TEXT,
    bio TEXT,
    location TEXT,
    avatar TEXT,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

-- Careers table
CREATE TABLE careers (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT,
    description TEXT,
    roadmap JSONB,
    created_at TIMESTAMP DEFAULT now()
);

-- Quizzes table
CREATE TABLE quizzes (
    id SERIAL PRIMARY KEY,
    type TEXT,
    title TEXT,
    questions JSONB,
    created_at TIMESTAMP DEFAULT now()
);

-- Quiz results table
CREATE TABLE results (
    id SERIAL PRIMARY KEY,
    quiz_id INTEGER REFERENCES quizzes(id),
    user_id UUID REFERENCES users(id),
    answers JSONB,
    suggestions TEXT[],
    score_breakdown JSONB,
    created_at TIMESTAMP DEFAULT now()
);

-- User roadmaps table
CREATE TABLE user_roadmaps (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    career_id INTEGER REFERENCES careers(id),
    current_step INTEGER DEFAULT 0,
    completed BOOLEAN DEFAULT false,
    roadmap_override JSONB,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

-- Mentors table
CREATE TABLE mentors (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    bio TEXT,
    expertise TEXT[],
    photo_url TEXT,
    availability BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT now()
);

-- Mentor requests table
CREATE TABLE mentor_requests (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    mentor_id INTEGER REFERENCES mentors(id),
    note TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT now()
);

-- Success stories table
CREATE TABLE success_stories (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    title TEXT,
    story TEXT,
    career TEXT,
    approved BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT now()
);

-- Leaderboard table
CREATE TABLE leaderboard (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    score INTEGER DEFAULT 0,
    rank INTEGER,
    career TEXT,
    updated_at TIMESTAMP DEFAULT now()
);

-- Progress tracking table
CREATE TABLE progress (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    career_id INTEGER REFERENCES careers(id),
    step_completed INTEGER DEFAULT 0,
    total_steps INTEGER,
    completed_at TIMESTAMP DEFAULT now()
);

-- Questionnaires table
CREATE TABLE questionnaires (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    responses JSONB,
    completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT now()
);
```

#### Insert Sample Data
```bash
# Run the careers update script
psql -U myuser -d mydb -h localhost -f backend/update-careers.sql
```

### 3. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env with your database credentials
```

#### Environment Configuration (.env)
```env
PORT=5000
DATABASE_URL=postgresql://myuser:mypassword@localhost:5432/mydb
JWT_SECRET=your_super_secret_jwt_key_here_2024
NODE_ENV=development
OPENAI_API_KEY=your_openai_api_key_here
```

#### Start Backend Server
```bash
npm run dev
```
Backend will run on http://localhost:5000

### 4. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```
Frontend will run on http://localhost:5173

## 🏗️ Project Structure

```
metamind-platform/
├── backend/
│   ├── src/
│   │   ├── controllers/     # API route handlers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Authentication middleware
│   │   ├── config/         # Configuration files
│   │   ├── app.js          # Express app setup
│   │   └── db.js           # Database connection
│   ├── package.json
│   └── SETUP.md
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context
│   │   ├── utils/          # Utility functions
│   │   ├── locales/        # i18n translations
│   │   └── App.jsx         # Main app component
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 🎯 Core Features

### Career Assessment
- **Intelligent Quizzes**: Multi-dimensional career assessment
- **Personalized Recommendations**: AI-powered career suggestions
- **Sri Lankan Focus**: Specialized for NTS, VTA, and German Tech careers

### Career Roadmaps
- **Step-by-Step Guidance**: Detailed career progression paths
- **Progress Tracking**: Monitor advancement through career steps
- **Customizable Paths**: Personalized roadmap adjustments

### Mentorship System
- **Expert Matching**: Connect with industry professionals
- **Request System**: Submit mentorship requests
- **Success Stories**: Learn from others' career journeys

### Multi-language Support
- **English**: Full platform support
- **Sinhala**: Complete localization
- **Tamil**: Basic support

## 🛠️ Technology Stack

### Backend
- **Node.js** with Express.js
- **PostgreSQL** database
- **JWT** authentication
- **bcrypt** password hashing
- **OpenAI API** for AI features
- **CORS** enabled for frontend integration

### Frontend
- **React 19** with Vite
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Context API** for state management
- **i18next** for internationalization
- **Axios** for API calls

## 📊 Database Schema

### Key Tables
- **users**: User accounts and authentication
- **user_profiles**: Extended user information
- **careers**: Career information and roadmaps
- **quizzes**: Quiz questions and structure
- **results**: Quiz results and recommendations
- **user_roadmaps**: User's career progress tracking
- **mentors**: Mentor profiles and availability
- **mentor_requests**: Mentor connection requests
- **success_stories**: Inspirational career stories
- **leaderboard**: User rankings and scores
- **questionnaires**: User questionnaire responses

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

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

### Mentors
- `GET /api/mentors` - Get all mentors
- `POST /api/mentors/request` - Request mentorship

### Chat Assistant
- `POST /api/chat` - Send message to AI assistant

## 🧪 Testing

### Database Connection Test
```bash
psql -U myuser -d mydb -h localhost -c "SELECT COUNT(*) FROM careers;"
```

### API Testing
```bash
# Test backend health
curl http://localhost:5000/api/health

# Test quiz endpoint
curl http://localhost:5000/api/quizzes
```

### Frontend Testing
```bash
cd frontend
npm run build
npm run preview
```

## 🚀 Deployment

### Production Environment Variables
```env
PORT=5000
DATABASE_URL=postgresql://username:password@host:port/database
JWT_SECRET=your_production_jwt_secret
NODE_ENV=production
OPENAI_API_KEY=your_openai_api_key
```

### Build for Production
```bash
# Backend
cd backend
npm install --production
npm start

# Frontend
cd frontend
npm run build
# Serve the dist folder with a web server
```

## 🔍 Troubleshooting

### Common Issues

#### Database Connection Errors
```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Restart PostgreSQL
sudo systemctl restart postgresql

# Test connection
psql -U myuser -d mydb -h localhost
```

#### Port Already in Use
```bash
# Kill process on port 5000
sudo lsof -ti:5000 | xargs kill -9

# Kill process on port 5173
sudo lsof -ti:5173 | xargs kill -9
```

#### Node Modules Issues
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Frontend Build Issues
```bash
# Clear Vite cache
rm -rf node_modules/.vite

# Reinstall dependencies
npm install
```

## 📝 Development Guidelines

### Code Style
- Use ESLint configuration provided
- Follow React best practices
- Use meaningful variable names
- Add comments for complex logic

### Git Workflow
1. Create feature branch from main
2. Make changes and test thoroughly
3. Commit with descriptive messages
4. Push to remote branch
5. Create pull request

### Database Changes
1. Create migration scripts
2. Test on development database
3. Update schema documentation
4. Coordinate with team members

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Open an issue in the GitHub repository
- Check the troubleshooting section above
- Review the API documentation

---

**MetaMind Platform** - Empowering career decisions through intelligent guidance