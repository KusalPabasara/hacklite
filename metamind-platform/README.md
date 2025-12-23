# Marga.lk - Career Guidance Platform

A comprehensive career guidance and mentorship platform for Sri Lankan youth, powered by AI-driven assessments and personalized career roadmaps.

## 🚀 Features

- **AI-Powered Career Assessment**: Interactive questionnaire with advanced matching algorithms
- **Personalized Career Recommendations**: Get matched with careers based on your interests and skills
- **Career Roadmaps**: Step-by-step guides for each career path
- **Gamified Progress Tracking**: Track your career journey with achievements and milestones
- **Mentorship System**: Connect with industry mentors
- **Multi-language Support**: English and Sinhala with Google Translate integration
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Email Confirmation**: Secure user registration with email verification

## 🏗️ Tech Stack

### Frontend
- **React 18** with Vite
- **React Router DOM** for routing
- **Tailwind CSS** for styling
- **Supabase Auth** for authentication
- **Axios** for API calls
- **i18next** for internationalization

### Backend
- **Node.js** with Express
- **PostgreSQL** (hosted on Supabase)
- **Supabase Auth** integration
- **JWT** token verification
- **Multer** for file uploads

### Database
- **Supabase PostgreSQL** with connection pooling
- Row Level Security (RLS) enabled
- Automatic profile creation on signup

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account and project
- Gmail account with app password (for SMTP)

## 🛠️ Installation

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd metamind-platform
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=5000
DATABASE_URL=postgresql://user:password@host:5432/database
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
JWT_SECRET=your-jwt-secret
NODE_ENV=production
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Create `.env.production` file:
```env
VITE_API_BASE_URL=https://your-domain.com/api
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Database Setup
Run the SQL migration in Supabase SQL Editor:
- See `docs/database/supabase-complete-setup.sql`

## 🚀 Deployment

See [docs/deployment/DEPLOYMENT.md](docs/deployment/DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy
```bash
# On VPS
./setup.sh          # Initial setup
./deploy.sh         # Deploy updates
```

## 📁 Project Structure

```
metamind-platform/
├── backend/          # Node.js/Express backend
├── frontend/         # React/Vite frontend
├── docs/             # Documentation
│   ├── database/     # Database setup & migrations
│   ├── deployment/   # Deployment guides
│   └── setup/        # Setup & configuration
├── .gitignore        # Git ignore rules
├── README.md         # This file
├── CONTRIBUTING.md   # Contribution guidelines
├── LICENSE           # MIT License
├── ecosystem.config.js
├── nginx.conf
├── setup.sh
└── deploy.sh
```

See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for detailed structure.

## 📚 Documentation

All documentation is organized in the `docs/` folder:

- **Deployment**: [Deployment Guide](docs/deployment/DEPLOYMENT.md), [Quick Deploy](docs/deployment/QUICK_DEPLOY.md)
- **Database**: [Database Setup](docs/database/DATABASE_SETUP.md), [SQL Migration](docs/database/supabase-complete-setup.sql)
- **Setup**: [Environment Setup](docs/setup/ENVIRONMENT_SETUP.md), [Supabase Setup](docs/setup/SUPABASE_SETUP.md), [Gmail SMTP](docs/setup/GMAIL_SMTP_CONFIG.md)

See [docs/README.md](docs/README.md) for complete documentation index.

## 🔐 Environment Variables

### Backend (.env)
- `DATABASE_URL` - PostgreSQL connection string
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `JWT_SECRET` - JWT secret for token signing
- `PORT` - Server port (default: 5000)

### Frontend (.env.production)
- `VITE_API_BASE_URL` - Backend API URL
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key

## 🧪 Development

### Backend
```bash
cd backend
npm run dev      # Development with nodemon
npm start        # Production
```

### Frontend
```bash
cd frontend
npm run dev      # Development server
npm run build    # Production build
```

## 🔒 Security

- Row Level Security (RLS) enabled on all tables
- JWT token authentication
- CORS configured for production domain
- Environment variables for sensitive data
- Secure password hashing with bcrypt
- Email confirmation required for registration

## 📝 License

MIT License - see [LICENSE](./LICENSE) file

## 👥 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines.

## 📧 Support

For issues and questions, please open an issue on GitHub.

---

**Built with ❤️ for Sri Lankan Youth**
