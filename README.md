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

## 🗄️ Database Setup

### PostgreSQL Database
```sql
-- Create database
createdb metamind_db

-- The application will automatically create tables on first run
```

### Key Tables
- `users` - User accounts and authentication
- `careers` - Career information and roadmaps
- `quizzes` - Quiz questions and structure
- `results` - Quiz results and recommendations
- `user_roadmaps` - User's career progress tracking
- `mentors` - Mentor profiles and availability
- `success_stories` - Inspirational career stories

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
