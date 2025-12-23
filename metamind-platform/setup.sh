#!/bin/bash

# MetaMind Platform Initial Setup Script
# Run this once on a fresh VPS
# Usage: ./setup.sh

set -e  # Exit on error

echo "🔧 MetaMind Platform Initial Setup"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check if root
if [ "$EUID" -ne 0 ]; then 
    echo -e "${RED}❌ Please run as root or with sudo${NC}"
    exit 1
fi

# Update system
echo -e "${GREEN}📦 Updating system packages...${NC}"
apt update && apt upgrade -y

# Install Node.js 18+
echo -e "${GREEN}📦 Installing Node.js...${NC}"
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Install PM2
echo -e "${GREEN}📦 Installing PM2...${NC}"
npm install -g pm2

# Install Nginx
echo -e "${GREEN}📦 Installing Nginx...${NC}"
apt install -y nginx

# Install Certbot for SSL
echo -e "${GREEN}📦 Installing Certbot...${NC}"
apt install -y certbot python3-certbot-nginx

# Install Git
echo -e "${GREEN}📦 Installing Git...${NC}"
apt install -y git

# Create project directory
echo -e "${GREEN}📁 Creating project directory...${NC}"
mkdir -p /var/www/metamind-platform
mkdir -p /var/www/metamind-platform/logs

# Setup firewall
echo -e "${GREEN}🔥 Configuring firewall...${NC}"
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw --force enable

# Verify installations
echo -e "${GREEN}✅ Verifying installations...${NC}"
echo "Node.js: $(node --version)"
echo "npm: $(npm --version)"
echo "PM2: $(pm2 --version)"
echo "Nginx: $(nginx -v 2>&1)"

echo ""
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Upload project files to /var/www/metamind-platform"
echo "2. Configure .env files in backend and frontend directories"
echo "3. Run deploy.sh to deploy the application"
echo "4. Setup SSL certificate: sudo certbot --nginx -d marga.kusalpabasara.me"


