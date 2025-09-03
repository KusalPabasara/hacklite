# Backend Setup Guide

## Environment Variables

Create a `.env` file in the backend directory with the following content:

```env
PORT=5000
DATABASE_URL=postgresql://myuser:mypassword@localhost:5432/mydb
JWT_SECRET=your_super_secret_jwt_key_here_2024
NODE_ENV=development
```

## Database Setup

1. **Install PostgreSQL** if you haven't already
2. **Create database and user**:
   ```bash
   sudo -u postgres createuser --interactive myuser
   sudo -u postgres createdb mydb
   sudo -u postgres psql -c "ALTER USER myuser PASSWORD 'mypassword';"
   sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE mydb TO myuser;"
   ```

3. **Run the careers update script**:
   ```bash
   psql -U myuser -d mydb -h localhost -f update-careers.sql
   ```

## Start the Backend

```bash
cd backend
npm install
npm run dev
```

The server should start on http://localhost:5000

## Troubleshooting

- **500 errors**: Check database connection and .env file
- **400 errors**: Check request format and authentication
- **Database connection**: Verify PostgreSQL is running and credentials are correct
