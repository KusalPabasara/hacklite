# MetaMind Platform - Complete Knowledge Base 🧠

## 🎯 **Project Overview**

**MetaMind** is a comprehensive career guidance platform designed specifically for Sri Lankan students. It provides personalized career recommendations, educational pathways, and mentorship opportunities through an intelligent AI-powered system.

### **Core Mission**
- **Career Discovery**: Help students find their ideal career path
- **Educational Guidance**: Provide clear roadmaps for career goals
- **Multilingual Support**: Serve students in English, Sinhala, and Tamil
- **AI-Powered**: Intelligent recommendations and chat assistance
- **Local Focus**: Specialized for Sri Lankan education system and opportunities

---

## 🏗️ **Project Architecture**

### **Technology Stack**
- **Frontend**: React 19.1.1 + Vite + TailwindCSS
- **Backend**: Node.js + Express 5.1.0 + PostgreSQL
- **Authentication**: JWT + bcrypt
- **AI Integration**: OpenAI GPT-3.5-turbo
- **Internationalization**: react-i18next + Google Translate
- **Styling**: TailwindCSS + Custom CSS
- **Database**: PostgreSQL with pg driver

### **Deployment Architecture**
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (React/Vite)  │◄──►│   (Node/Express)│◄──►│   (PostgreSQL)  │
│   Port: 5173    │    │   Port: 5000    │    │   Port: 5432    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │
         │                       │
         ▼                       ▼
┌─────────────────┐    ┌─────────────────┐
│   Google        │    │   OpenAI        │
│   Translate     │    │   API           │
│   (Client-side) │    │   (Server-side) │
└─────────────────┘    └─────────────────┘
```

---

## 📁 **Directory Structure**

```
metamind-platform/
├── backend/                          # Node.js/Express Backend
│   ├── src/
│   │   ├── app.js                   # Main server entry point
│   │   ├── db.js                    # Database connection
│   │   ├── controllers/             # Business logic handlers
│   │   │   ├── authController.js    # Authentication logic
│   │   │   ├── careerController.js  # Career management
│   │   │   ├── mentorController.js  # Mentor system
│   │   │   ├── questionnaireController.js # Career assessment
│   │   │   ├── quizController.js    # Quiz system
│   │   │   ├── roadmapController.js # Career roadmaps
│   │   │   └── storyController.js   # Success stories
│   │   ├── middleware/
│   │   │   └── authMiddleware.js    # JWT authentication
│   │   ├── models/                  # Database models
│   │   │   ├── userModel.js         # User data operations
│   │   │   ├── careerModel.js       # Career data operations
│   │   │   ├── mentorModel.js       # Mentor data operations
│   │   │   ├── questionnaireModel.js # Assessment data
│   │   │   ├── quizModel.js         # Quiz data operations
│   │   │   ├── roadmapModel.js      # Roadmap data
│   │   │   └── storyModel.js        # Success story data
│   │   └── routes/                  # API route definitions
│   │       ├── authRoutes.js        # Authentication endpoints
│   │       ├── careerRoutes.js      # Career endpoints
│   │       ├── mentorRoutes.js      # Mentor endpoints
│   │       ├── questionnaireRoutes.js # Assessment endpoints
│   │       ├── quizRoutes.js        # Quiz endpoints
│   │       ├── roadmapRoutes.js     # Roadmap endpoints
│   │       ├── storyRoutes.js       # Story endpoints
│   │       └── chatRoutes.js        # AI chat endpoints
│   ├── package.json                 # Backend dependencies
│   ├── SETUP.md                     # Backend setup guide
│   └── update-careers.sql           # Database schema updates
│
├── frontend/                         # React Frontend
│   ├── src/
│   │   ├── App.jsx                  # Main React application
│   │   ├── index.jsx                # React entry point
│   │   ├── index.css                # Global styles
│   │   ├── components/              # Reusable UI components
│   │   │   ├── Navbar.jsx           # Navigation component
│   │   │   ├── Logo.jsx             # Brand logo component
│   │   │   ├── LanguageTranslator.jsx # Language switching
│   │   │   ├── ThemeToggle.jsx      # Dark/light mode toggle
│   │   │   ├── ProtectedRoute.jsx   # Route protection
│   │   │   ├── Questionnaire.jsx    # Career assessment form
│   │   │   ├── QuestionnaireRedirect.jsx # Assessment flow control
│   │   │   ├── ChatBubble.jsx       # Chat message component
│   │   │   └── VoiceInput.jsx       # Speech-to-text input
│   │   ├── pages/                   # Page components
│   │   │   ├── Dashboard.jsx        # Main dashboard
│   │   │   ├── Login.jsx            # User login
│   │   │   ├── Register.jsx         # User registration
│   │   │   ├── Profile.jsx          # User profile management
│   │   │   ├── ExploreCareers.jsx   # Career exploration
│   │   │   ├── QuestionnairePage.jsx # Assessment page
│   │   │   ├── Quizzes.jsx          # Quiz listing
│   │   │   ├── QuizTake.jsx         # Quiz taking interface
│   │   │   ├── Roadmap.jsx          # Career roadmap display
│   │   │   ├── Mentors.jsx          # Mentor directory
│   │   │   ├── Inspiration.jsx      # Success stories
│   │   │   ├── Leaderboard.jsx      # User rankings
│   │   │   └── ChatAssistant.jsx    # AI chat interface
│   │   ├── context/
│   │   │   └── AuthContext.jsx      # Authentication state management
│   │   ├── utils/
│   │   │   └── api.jsx              # API communication utilities
│   │   ├── locales/                 # Internationalization files
│   │   │   ├── en.json              # English translations
│   │   │   └── si.json              # Sinhala translations
│   │   └── i18n.js                  # Internationalization setup
│   ├── public/                      # Static assets
│   │   ├── marga-logo.svg           # Main logo
│   │   ├── marga-logo-light.svg     # Light theme logo
│   │   ├── marga-logo-dark.svg      # Dark theme logo
│   │   └── vite.svg                 # Vite logo
│   ├── package.json                 # Frontend dependencies
│   ├── vite.config.js               # Vite configuration
│   ├── tailwind.config.js           # TailwindCSS configuration
│   ├── index.html                   # HTML entry point
│   └── *.md                         # Documentation files
│
└── docs/                            # Project documentation
```

---

## 🧩 **Component Architecture**

### **Frontend Components**

#### **1. Core Layout Components**

**Navbar.jsx** - Main navigation component
- **Purpose**: Primary navigation with language switching and user menu
- **Features**: 
  - Dark/light theme support
  - Language translator integration
  - User profile dropdown
  - Mobile responsive hamburger menu
- **Dependencies**: LanguageTranslator, ThemeToggle, Logo
- **State**: User authentication, current language, theme

**Logo.jsx** - Brand logo component
- **Purpose**: Displays Marga.lk logo with theme adaptation
- **Features**:
  - Automatic theme detection (light/dark)
  - Hover effects with glow animation
  - SVG-based scalable design
- **Props**: className, theme

#### **2. Authentication Components**

**ProtectedRoute.jsx** - Route protection wrapper
- **Purpose**: Protects routes requiring authentication
- **Features**: Redirects unauthenticated users to login
- **Usage**: Wraps protected pages in routing

**AuthContext.jsx** - Authentication state management
- **Purpose**: Global authentication state and user management
- **Features**:
  - User login/logout
  - Token management
  - Questionnaire completion tracking
  - Profile data management
- **State**: user, token, questionnaireCompleted, userProfile

#### **3. Assessment Components**

**Questionnaire.jsx** - Career assessment form
- **Purpose**: Multi-step career assessment questionnaire
- **Features**:
  - Dynamic question filtering
  - Progress tracking
  - Answer validation
  - Career recommendation generation
- **State**: questions, answers, currentQuestion, loading
- **Integration**: Connects to questionnaire API

**QuestionnaireRedirect.jsx** - Assessment flow control
- **Purpose**: Redirects users to assessment if not completed
- **Features**: Conditional rendering based on completion status

#### **4. Career Components**

**ExploreCareers.jsx** - Career exploration interface
- **Purpose**: Displays career options and recommendations
- **Features**:
  - Personalized recommendations from questionnaire
  - Career filtering and search
  - Career detail views
  - Roadmap integration
- **State**: careers, recommendations, loading
- **Integration**: Receives state from questionnaire

**Roadmap.jsx** - Career roadmap display
- **Purpose**: Shows step-by-step career progression
- **Features**:
  - Interactive roadmap steps
  - Progress tracking
  - Step completion marking
- **State**: roadmap, currentStep, progress

#### **5. Learning Components**

**Quizzes.jsx** - Quiz listing page
- **Purpose**: Displays available quizzes
- **Features**: Quiz selection and navigation

**QuizTake.jsx** - Quiz taking interface
- **Purpose**: Interactive quiz taking experience
- **Features**:
  - Question navigation
  - Answer selection
  - Progress tracking
  - Results submission

#### **6. AI Components**

**ChatAssistant.jsx** - AI chat interface
- **Purpose**: AI-powered career guidance chat
- **Features**:
  - Real-time chat with AI
  - Voice input support
  - Message history
  - Suggested questions
- **Integration**: OpenAI GPT-3.5-turbo API

**ChatBubble.jsx** - Chat message component
- **Purpose**: Individual chat message display
- **Features**: Message formatting, sender identification

**VoiceInput.jsx** - Speech-to-text input
- **Purpose**: Voice input for chat
- **Features**: Web Speech API integration, language detection

#### **7. Utility Components**

**LanguageTranslator.jsx** - Language switching
- **Purpose**: Google Translate integration for multilingual support
- **Features**:
  - Three language support (English, Sinhala, Tamil)
  - Persistent language preferences
  - Loading states and visual feedback
- **Integration**: Google Translate Widget

**ThemeToggle.jsx** - Dark/light mode toggle
- **Purpose**: Theme switching functionality
- **Features**: Persistent theme preferences, smooth transitions

### **Backend Components**

#### **1. Controllers (Business Logic)**

**authController.js** - Authentication logic
- **Functions**: register, login
- **Features**: Password hashing, JWT token generation

**careerController.js** - Career management
- **Functions**: getCareers, getCareer, postCareer, putCareer, removeCareer
- **Features**: CRUD operations for career data

**questionnaireController.js** - Assessment logic
- **Functions**: getQuestions, submitAnswers, getRecommendations, checkCompletion
- **Features**: Career recommendation algorithm, answer processing

**quizController.js** - Quiz system
- **Functions**: getQuizzes, getSingleQuiz, submitQuiz, getUserResults
- **Features**: Quiz scoring, career suggestion based on answers

**roadmapController.js** - Roadmap management
- **Functions**: setTargetCareer, getUserSteps, updateUserSteps, getRoadmapByCareer
- **Features**: Progress tracking, step management

**mentorController.js** - Mentor system
- **Functions**: getAllMentors, createMentor, submitMentorRequest, getMentorInbox
- **Features**: Mentor-student matching, request management

**storyController.js** - Success stories
- **Functions**: addSuccessStory, getStories, adminVerify
- **Features**: Story submission and verification

**chatRoutes.js** - AI chat integration
- **Features**: OpenAI API integration, fallback responses for Sri Lankan context

#### **2. Models (Data Layer)**

**userModel.js** - User data operations
- **Functions**: createUser, findUserByEmail
- **Features**: User registration and authentication

**careerModel.js** - Career data operations
- **Functions**: getAllCareers, getCareerById, createCareer, updateCareer, deleteCareer
- **Features**: Career CRUD operations

**questionnaireModel.js** - Assessment data
- **Functions**: getQuestionnaireQuestions, saveQuestionnaireAnswers, calculateCareerRecommendations
- **Features**: Complex career recommendation algorithm

**quizModel.js** - Quiz data operations
- **Functions**: getAllQuizzes, getQuizById, saveResult, getResultsByUser
- **Features**: Quiz management and result tracking

**roadmapModel.js** - Roadmap data
- **Functions**: saveUserRoadmap, getUserRoadmap, updateProgress
- **Features**: User progress tracking

**mentorModel.js** - Mentor data operations
- **Functions**: getMentors, addMentor, requestMentorship, getRequestsByMentor
- **Features**: Mentor-student relationship management

**storyModel.js** - Success story data
- **Functions**: addStory, getVerifiedStories, listAllStories, verifyStory
- **Features**: Story management and verification

#### **3. Middleware**

**authMiddleware.js** - JWT authentication
- **Purpose**: Protects routes requiring authentication
- **Features**: Token verification, user context injection

---

## 🗄️ **Database Schema**

### **Core Tables**

**users** - User accounts
```sql
- id (Primary Key)
- name
- email (Unique)
- password (Hashed)
- role (student/admin)
- language
- questionnaire_completed
- questionnaire_completed_at
- created_at
- updated_at
```

**careers** - Career information
```sql
- id (Primary Key)
- title
- category
- description
- roadmap (JSON)
- created_at
- updated_at
```

**questionnaire_questions** - Assessment questions
```sql
- id (Primary Key)
- question_text
- question_type
- options (JSON)
- career_weight (JSON)
- created_at
```

**questionnaire_answers** - User responses
```sql
- id (Primary Key)
- user_id (Foreign Key)
- question_id (Foreign Key)
- answer
- created_at
```

**user_career_recommendations** - Generated recommendations
```sql
- id (Primary Key)
- user_id (Foreign Key)
- career_id (Foreign Key)
- match_score
- created_at
```

**quizzes** - Quiz data
```sql
- id (Primary Key)
- title
- description
- questions (JSON)
- created_at
```

**results** - Quiz results
```sql
- id (Primary Key)
- quiz_id (Foreign Key)
- user_id (Foreign Key)
- answers (JSON)
- suggestions (JSON)
- created_at
```

**user_roadmaps** - User career progress
```sql
- id (Primary Key)
- user_id (Foreign Key)
- career_id (Foreign Key)
- current_step
- completed
- roadmap_override (JSON)
- created_at
- updated_at
```

**mentors** - Mentor profiles
```sql
- id (Primary Key)
- name
- bio
- expertise
- photo_url
- created_at
```

**mentor_requests** - Mentor requests
```sql
- id (Primary Key)
- user_id (Foreign Key)
- mentor_id (Foreign Key)
- note
- status
- created_at
```

**success_stories** - Success stories
```sql
- id (Primary Key)
- user_id (Foreign Key)
- career_title
- quote
- full_story
- photo_url
- is_verified
- created_at
```

---

## 🌐 **API Endpoints**

### **Authentication**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### **Careers**
- `GET /api/careers` - Get all careers
- `GET /api/careers/:id` - Get specific career
- `POST /api/careers` - Create career (admin)
- `PUT /api/careers/:id` - Update career (admin)
- `DELETE /api/careers/:id` - Delete career (admin)

### **Questionnaire**
- `GET /api/questionnaire/questions` - Get assessment questions
- `POST /api/questionnaire/submit` - Submit answers
- `GET /api/questionnaire/recommendations` - Get user recommendations
- `GET /api/questionnaire/completion` - Check completion status
- `GET /api/questionnaire/answers` - Get user answers

### **Quizzes**
- `GET /api/quizzes` - Get all quizzes
- `GET /api/quizzes/:id` - Get specific quiz
- `POST /api/quizzes/:id/submit` - Submit quiz answers
- `GET /api/quizzes/user/:userId` - Get user results

### **Roadmaps**
- `GET /api/roadmap` - Get user roadmap
- `POST /api/roadmap/select` - Set target career
- `PUT /api/roadmap/progress` - Update progress
- `GET /api/roadmap/:careerId` - Get roadmap by career

### **Mentors**
- `GET /api/mentors` - Get all mentors
- `POST /api/mentors` - Create mentor (admin)
- `POST /api/mentors/request` - Request mentorship
- `GET /api/mentors/requests/:mentorId` - Get mentor requests

### **Stories**
- `GET /api/stories` - Get verified stories
- `POST /api/stories` - Submit story
- `PUT /api/stories/:id/verify` - Verify story (admin)

### **Chat**
- `POST /api/chat` - AI chat interaction

### **Leaderboard**
- `GET /api/leaderboard` - Get user rankings

---

## 🎨 **UI/UX Design System**

### **Color Palette**
- **Primary**: Purple gradients (#8B5CF6, #A855F7)
- **Secondary**: Blue accents (#3B82F6, #1D4ED8)
- **Success**: Green (#10B981, #059669)
- **Warning**: Yellow (#F59E0B, #D97706)
- **Error**: Red (#EF4444, #DC2626)
- **Neutral**: Gray scale (#F9FAFB to #111827)

### **Typography**
- **Font Family**: Inter, system-ui, sans-serif
- **Headings**: Font weights 600-800
- **Body**: Font weight 400-500
- **Responsive**: Scales with screen size

### **Components**
- **Cards**: Rounded corners, subtle shadows, hover effects
- **Buttons**: Gradient backgrounds, smooth transitions
- **Forms**: Clean inputs with focus states
- **Navigation**: Dark theme with glass morphism effects

### **Responsive Design**
- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Grid System**: CSS Grid and Flexbox
- **Touch Friendly**: Large touch targets on mobile

---

## 🌍 **Internationalization**

### **Supported Languages**
- **English** (en) - Default language
- **Sinhala** (si) - සිංහල
- **Tamil** (ta) - தமிழ்

### **Implementation**
- **Static Content**: react-i18next with JSON translation files
- **Dynamic Content**: Google Translate Widget for real-time translation
- **Language Detection**: Browser language detection with fallback
- **Persistence**: User language preference saved in localStorage

### **Translation Files**
- `locales/en.json` - English translations
- `locales/si.json` - Sinhala translations
- `locales/ta.json` - Tamil translations (planned)

---

## 🔐 **Security Features**

### **Authentication**
- **JWT Tokens**: Secure token-based authentication
- **Password Hashing**: bcrypt with salt rounds
- **Token Expiration**: 2-hour token lifetime
- **Protected Routes**: Middleware-based route protection

### **Data Protection**
- **Input Validation**: Server-side validation for all inputs
- **SQL Injection Prevention**: Parameterized queries with pg driver
- **CORS Configuration**: Restricted cross-origin requests
- **Environment Variables**: Sensitive data in .env files

### **API Security**
- **Rate Limiting**: Prevents API abuse
- **Error Handling**: Secure error messages
- **Request Validation**: Input sanitization
- **Admin Routes**: Role-based access control

---

## 🚀 **Deployment & Setup**

### **Development Setup**

**Backend Setup:**
```bash
cd backend
npm install
# Create .env file with database and API keys
npm run dev  # Starts on port 5000
```

**Frontend Setup:**
```bash
cd frontend
npm install
npm run dev  # Starts on port 5173
```

**Database Setup:**
```bash
# Install PostgreSQL
# Create database and user
# Run update-careers.sql for initial data
```

### **Environment Variables**

**Backend (.env):**
```env
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/metamind
JWT_SECRET=your_jwt_secret_key
OPENAI_API_KEY=your_openai_api_key
NODE_ENV=development
```

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_TRANSLATE_ENABLED=true
```

### **Production Deployment**
- **Frontend**: Build with `npm run build`, serve static files
- **Backend**: Deploy to Node.js hosting (Heroku, Railway, etc.)
- **Database**: PostgreSQL hosting (Supabase, AWS RDS, etc.)
- **CDN**: Static assets via CDN for performance

---

## 📊 **Key Features**

### **1. Career Assessment System**
- **Multi-step Questionnaire**: Dynamic question filtering based on responses
- **Intelligent Scoring**: Weighted algorithm for career matching
- **Personalized Recommendations**: Top 3 career suggestions with match scores
- **Progress Tracking**: Visual progress indicators and completion status

### **2. AI-Powered Chat Assistant**
- **OpenAI Integration**: GPT-3.5-turbo for intelligent responses
- **Sri Lankan Context**: Specialized knowledge for local education system
- **Voice Input**: Speech-to-text for accessibility
- **Fallback Responses**: Offline-capable responses for common queries

### **3. Career Roadmaps**
- **Step-by-step Guidance**: Detailed career progression paths
- **Progress Tracking**: User progress through roadmap steps
- **Interactive Interface**: Clickable steps with completion marking
- **Customizable Paths**: Override default roadmaps with custom steps

### **4. Multilingual Support**
- **Three Languages**: English, Sinhala, Tamil
- **Real-time Translation**: Google Translate integration
- **Persistent Preferences**: Language choice remembered across sessions
- **Cultural Adaptation**: Content adapted for Sri Lankan context

### **5. User Management**
- **Registration/Login**: Secure user authentication
- **Profile Management**: User profile with avatar upload
- **Progress Tracking**: Career assessment and roadmap progress
- **Personalization**: Tailored content based on user preferences

### **6. Educational Content**
- **Career Information**: Detailed career descriptions and requirements
- **Success Stories**: Inspirational stories from professionals
- **Mentor Network**: Connect with industry professionals
- **Quiz System**: Interactive learning and assessment

---

## 🔧 **Development Guidelines**

### **Code Standards**
- **ESLint**: Configured for React and JavaScript
- **Prettier**: Code formatting consistency
- **Component Structure**: Functional components with hooks
- **State Management**: React Context for global state
- **API Communication**: Axios for HTTP requests

### **File Naming**
- **Components**: PascalCase (e.g., `Navbar.jsx`)
- **Pages**: PascalCase (e.g., `Dashboard.jsx`)
- **Utilities**: camelCase (e.g., `api.jsx`)
- **Styles**: kebab-case (e.g., `index.css`)

### **Git Workflow**
- **Feature Branches**: Create branches for new features
- **Commit Messages**: Clear, descriptive commit messages
- **Pull Requests**: Code review before merging
- **Documentation**: Update docs with new features

---

## 📈 **Future Enhancements**

### **Planned Features**
- **Mobile App**: React Native mobile application
- **Advanced Analytics**: User behavior tracking and insights
- **Video Content**: Career guidance videos and tutorials
- **Social Features**: User communities and forums
- **Gamification**: Points, badges, and achievements
- **Integration**: University and employer partnerships

### **Technical Improvements**
- **Performance**: Code splitting and lazy loading
- **Testing**: Unit and integration tests
- **Monitoring**: Error tracking and performance monitoring
- **Caching**: Redis for improved performance
- **Microservices**: Break down monolithic backend

---

## 🎯 **Target Audience**

### **Primary Users**
- **Sri Lankan Students**: Ages 16-25 seeking career guidance
- **Recent Graduates**: Looking for career direction
- **Career Changers**: Professionals seeking new opportunities
- **Parents/Guardians**: Supporting their children's career decisions

### **Use Cases**
- **Career Discovery**: Finding suitable career paths
- **Educational Planning**: Choosing appropriate courses and institutions
- **Skill Development**: Identifying required skills and training
- **Networking**: Connecting with mentors and professionals
- **Inspiration**: Learning from success stories

---

## 🏆 **Success Metrics**

### **User Engagement**
- **Assessment Completion Rate**: Percentage of users completing questionnaire
- **Session Duration**: Average time spent on platform
- **Return Visits**: User retention and repeat usage
- **Feature Adoption**: Usage of different platform features

### **Educational Impact**
- **Career Clarity**: User satisfaction with career recommendations
- **Goal Setting**: Users setting and achieving career goals
- **Skill Development**: Users pursuing recommended skills
- **Success Stories**: Users achieving career milestones

### **Technical Performance**
- **Page Load Speed**: Fast loading times across devices
- **Uptime**: Platform availability and reliability
- **Error Rates**: Low error rates and smooth user experience
- **Mobile Performance**: Optimized mobile experience

---

This knowledge base provides a comprehensive overview of the MetaMind platform, covering all aspects from technical architecture to user experience. It serves as a complete reference for developers, stakeholders, and anyone working with the platform.
