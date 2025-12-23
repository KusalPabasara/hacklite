#!/bin/bash

# MetaMind Platform - Master Deployment Script
# This script does EVERYTHING needed for deployment
# Run this on your VPS: bash master-deploy.sh

set -e  # Exit on error

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  MetaMind Platform - Master Deploy    ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"
echo ""

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo -e "${YELLOW}⚠️  Not running as root. Some commands may need sudo.${NC}"
    SUDO="sudo"
else
    SUDO=""
fi

# Configuration
PROJECT_DIR="/var/www/metamind-platform"
BACKEND_DIR="$PROJECT_DIR/backend"
FRONTEND_DIR="$PROJECT_DIR/frontend"
DOMAIN="marga.kusalpabasara.me"
DB_URL="postgresql://postgres.onzdjdxvnemoikybbwhz:[kusalPABASARAabc123$]@aws-1-ap-south-1.pooler.supabase.com:5432/postgres"

echo -e "${GREEN}📋 Configuration:${NC}"
echo "   Project: $PROJECT_DIR"
echo "   Domain: $DOMAIN"
echo ""

# Step 1: Install System Dependencies
echo -e "${GREEN}📦 Step 1: Installing system dependencies...${NC}"
$SUDO apt update -qq
$SUDO apt install -y curl git nginx certbot python3-certbot-nginx

# Install Node.js 18+
if ! command -v node &> /dev/null || [ "$(node -v | cut -d'v' -f2 | cut -d'.' -f1)" -lt 18 ]; then
    echo -e "${GREEN}📦 Installing Node.js 18+...${NC}"
    curl -fsSL https://deb.nodesource.com/setup_18.x | $SUDO -E bash -
    $SUDO apt install -y nodejs
fi

# Install PM2
if ! command -v pm2 &> /dev/null; then
    echo -e "${GREEN}📦 Installing PM2...${NC}"
    $SUDO npm install -g pm2
fi

# Step 2: Create Project Directory
echo -e "${GREEN}📁 Step 2: Creating project directory...${NC}"
$SUDO mkdir -p $PROJECT_DIR
$SUDO mkdir -p $PROJECT_DIR/logs
$SUDO mkdir -p $BACKEND_DIR/uploads/profile-pictures
$SUDO chown -R $USER:$USER $PROJECT_DIR 2>/dev/null || true

# Step 3: Check if project files exist
echo -e "${GREEN}🔍 Step 3: Checking project files...${NC}"
if [ ! -f "$BACKEND_DIR/package.json" ]; then
    echo -e "${RED}❌ Backend files not found in $BACKEND_DIR${NC}"
    echo -e "${YELLOW}⚠️  Please upload project files first!${NC}"
    echo -e "${YELLOW}   Use: rsync -avz --exclude 'node_modules' --exclude '.git' hacklite/metamind-platform/ root@152.42.185.253:/var/www/metamind-platform/${NC}"
    exit 1
fi

# Step 4: Setup Backend Environment
echo -e "${GREEN}⚙️  Step 4: Configuring backend environment...${NC}"
cd $BACKEND_DIR

if [ ! -f ".env" ]; then
    echo -e "${GREEN}📝 Creating backend .env file...${NC}"
    cat > .env << EOF
# Database Configuration (Supabase)
DATABASE_URL=$DB_URL

# JWT Secret (Generate a strong secret)
JWT_SECRET=$(openssl rand -base64 32)

# OpenAI API Key (Add your key here)
OPENAI_API_KEY=your_openai_api_key_here

# Server Configuration
PORT=5000
NODE_ENV=production

# CORS Origins
ALLOWED_ORIGINS=https://$DOMAIN,http://$DOMAIN
EOF
    echo -e "${YELLOW}⚠️  Backend .env created. Please add your OPENAI_API_KEY if needed.${NC}"
else
    echo -e "${GREEN}✅ Backend .env already exists${NC}"
fi

# Step 5: Setup Frontend Environment
echo -e "${GREEN}⚙️  Step 5: Configuring frontend environment...${NC}"
cd $FRONTEND_DIR

if [ ! -f ".env" ]; then
    echo -e "${GREEN}📝 Creating frontend .env file...${NC}"
    cat > .env << EOF
# API Base URL
VITE_API_BASE_URL=https://$DOMAIN/api

# App URL
VITE_APP_URL=https://$DOMAIN
EOF
    echo -e "${GREEN}✅ Frontend .env created${NC}"
else
    echo -e "${GREEN}✅ Frontend .env already exists${NC}"
fi

# Step 6: Install Dependencies
echo -e "${GREEN}📦 Step 6: Installing dependencies...${NC}"

echo -e "${BLUE}   Installing backend dependencies...${NC}"
cd $BACKEND_DIR
npm install --production --silent

echo -e "${BLUE}   Installing frontend dependencies...${NC}"
cd $FRONTEND_DIR
npm install --silent

# Step 7: Build Frontend
echo -e "${GREEN}🏗️  Step 7: Building frontend...${NC}"
cd $FRONTEND_DIR
npm run build

# Step 8: Setup PM2
echo -e "${GREEN}🔄 Step 8: Configuring PM2...${NC}"
cd $PROJECT_DIR

# Create logs directory
mkdir -p logs

# Stop existing processes if running
pm2 delete metamind-backend 2>/dev/null || true
pm2 delete metamind-frontend 2>/dev/null || true

# Start with ecosystem config
if [ -f "ecosystem.config.js" ]; then
    pm2 start ecosystem.config.js
else
    echo -e "${YELLOW}⚠️  ecosystem.config.js not found, starting manually...${NC}"
    cd $BACKEND_DIR
    pm2 start src/app.js --name metamind-backend --env production
    
    cd $FRONTEND_DIR
    pm2 start "npx serve -s dist -l 3000" --name metamind-frontend
fi

pm2 save
pm2 startup | grep -v PM2 || echo -e "${YELLOW}⚠️  Run 'pm2 startup' manually and execute the command shown${NC}"

# Step 9: Configure Nginx
echo -e "${GREEN}🌐 Step 9: Configuring Nginx...${NC}"

NGINX_CONFIG="/etc/nginx/sites-available/$DOMAIN"

if [ -f "$PROJECT_DIR/nginx.conf" ]; then
    $SUDO cp $PROJECT_DIR/nginx.conf $NGINX_CONFIG
    echo -e "${GREEN}✅ Nginx config copied${NC}"
else
    echo -e "${YELLOW}⚠️  nginx.conf not found, creating basic config...${NC}"
    $SUDO tee $NGINX_CONFIG > /dev/null << 'NGINX_EOF'
server {
    listen 80;
    listen [::]:80;
    server_name marga.kusalpabasara.me;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name marga.kusalpabasara.me;

    ssl_certificate /etc/letsencrypt/live/marga.kusalpabasara.me/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/marga.kusalpabasara.me/privkey.pem;

    client_max_body_size 10M;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /uploads {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        add_header Access-Control-Allow-Origin * always;
    }
}
NGINX_EOF
fi

# Enable site
$SUDO ln -sf $NGINX_CONFIG /etc/nginx/sites-enabled/
$SUDO rm -f /etc/nginx/sites-enabled/default 2>/dev/null || true

# Test Nginx config
if $SUDO nginx -t; then
    echo -e "${GREEN}✅ Nginx configuration valid${NC}"
    $SUDO systemctl reload nginx
else
    echo -e "${RED}❌ Nginx configuration error${NC}"
    exit 1
fi

# Step 10: Setup SSL Certificate
echo -e "${GREEN}🔒 Step 10: Setting up SSL certificate...${NC}"

if [ ! -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]; then
    echo -e "${YELLOW}⚠️  SSL certificate not found. Setting up...${NC}"
    echo -e "${YELLOW}   This will prompt for email and agreement.${NC}"
    $SUDO certbot --nginx -d $DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN --redirect || {
        echo -e "${YELLOW}⚠️  Certbot failed. You may need to run manually:${NC}"
        echo -e "${YELLOW}   sudo certbot --nginx -d $DOMAIN${NC}"
    }
else
    echo -e "${GREEN}✅ SSL certificate already exists${NC}"
    $SUDO certbot renew --dry-run || true
fi

# Step 11: Configure Firewall
echo -e "${GREEN}🔥 Step 11: Configuring firewall...${NC}"
$SUDO ufw allow 22/tcp 2>/dev/null || true
$SUDO ufw allow 80/tcp 2>/dev/null || true
$SUDO ufw allow 443/tcp 2>/dev/null || true
$SUDO ufw --force enable 2>/dev/null || echo -e "${YELLOW}⚠️  Firewall configuration skipped${NC}"

# Step 12: Set Permissions
echo -e "${GREEN}🔐 Step 12: Setting file permissions...${NC}"
$SUDO chown -R $USER:$USER $PROJECT_DIR 2>/dev/null || true
$SUDO chmod -R 755 $PROJECT_DIR
$SUDO chmod -R 775 $BACKEND_DIR/uploads 2>/dev/null || true

# Step 13: Test Database Connection
echo -e "${GREEN}🗄️  Step 13: Testing database connection...${NC}"
cd $BACKEND_DIR
node -e "
require('dotenv').config();
const {Pool} = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {rejectUnauthorized: false}
});
pool.query('SELECT NOW()')
  .then(r => {
    console.log('✅ Database connection successful');
    process.exit(0);
  })
  .catch(e => {
    console.error('❌ Database connection failed:', e.message);
    process.exit(1);
  });
" || echo -e "${YELLOW}⚠️  Database connection test failed. Check your DATABASE_URL${NC}"

# Step 14: Final Status Check
echo -e "${GREEN}📊 Step 14: Final status check...${NC}"
echo ""
echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║         Deployment Complete!          ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"
echo ""

pm2 status
echo ""

echo -e "${GREEN}✅ Services Status:${NC}"
echo "   Backend:  http://localhost:5000"
echo "   Frontend: http://localhost:3000"
echo "   Domain:   https://$DOMAIN"
echo ""

echo -e "${GREEN}📝 Next Steps:${NC}"
echo "   1. Add your OPENAI_API_KEY to backend/.env (if using chat assistant)"
echo "   2. Verify SSL certificate: https://$DOMAIN"
echo "   3. Test the application"
echo "   4. Check logs: pm2 logs"
echo ""

echo -e "${GREEN}🔗 Useful Commands:${NC}"
echo "   pm2 status              - Check process status"
echo "   pm2 logs                - View all logs"
echo "   pm2 restart all         - Restart all services"
echo "   sudo nginx -t            - Test Nginx config"
echo "   sudo systemctl status nginx - Check Nginx status"
echo ""

echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"


