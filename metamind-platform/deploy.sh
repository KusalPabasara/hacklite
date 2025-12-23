#!/bin/bash

# MetaMind Platform Deployment Script
# Usage: ./deploy.sh

set -e  # Exit on error

echo "🚀 Starting MetaMind Platform Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running as root or with sudo
if [ "$EUID" -ne 0 ]; then 
    echo -e "${YELLOW}⚠️  Running without sudo. Some commands may fail.${NC}"
fi

# Project directory
PROJECT_DIR="/var/www/metamind-platform"
BACKEND_DIR="$PROJECT_DIR/backend"
FRONTEND_DIR="$PROJECT_DIR/frontend"

echo -e "${GREEN}📁 Project Directory: $PROJECT_DIR${NC}"

# Step 1: Install dependencies
echo -e "${GREEN}📦 Installing backend dependencies...${NC}"
cd $BACKEND_DIR
npm install --production

echo -e "${GREEN}📦 Installing frontend dependencies...${NC}"
cd $FRONTEND_DIR
npm install

# Step 2: Build frontend
echo -e "${GREEN}🏗️  Building frontend...${NC}"
cd $FRONTEND_DIR
npm run build

# Step 3: Create logs directory
echo -e "${GREEN}📝 Creating logs directory...${NC}"
mkdir -p $PROJECT_DIR/logs

# Step 4: Restart PM2 processes
echo -e "${GREEN}🔄 Restarting PM2 processes...${NC}"
cd $PROJECT_DIR
pm2 restart ecosystem.config.js || pm2 start ecosystem.config.js

# Step 5: Save PM2 configuration
pm2 save

# Step 6: Reload Nginx
echo -e "${GREEN}🔄 Reloading Nginx...${NC}"
sudo nginx -t && sudo systemctl reload nginx

# Step 7: Show status
echo -e "${GREEN}✅ Deployment Complete!${NC}"
echo ""
echo -e "${GREEN}📊 PM2 Status:${NC}"
pm2 status

echo ""
echo -e "${GREEN}🌐 Application URLs:${NC}"
echo "   Frontend: https://marga.kusalpabasara.me"
echo "   Backend API: https://marga.kusalpabasara.me/api"
echo ""
echo -e "${YELLOW}💡 View logs with: pm2 logs${NC}"


