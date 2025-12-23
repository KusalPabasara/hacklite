#!/bin/bash

# MetaMind Platform - Local Preparation Script
# Run this on your LOCAL machine to prepare files for deployment
# Usage: ./prepare-deployment.sh

set -e

echo "🚀 Preparing MetaMind Platform for Deployment..."

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Create deployment package
echo -e "${GREEN}📦 Creating deployment package...${NC}"

# Create temp directory
TEMP_DIR=$(mktemp -d)
echo "   Temp directory: $TEMP_DIR"

# Copy project files (excluding node_modules, .git, etc.)
echo -e "${GREEN}📁 Copying project files...${NC}"
rsync -av --progress \
  --exclude 'node_modules' \
  --exclude '.git' \
  --exclude '.env' \
  --exclude '*.log' \
  --exclude 'dist' \
  --exclude '.next' \
  --exclude 'coverage' \
  --exclude '.DS_Store' \
  --exclude '*.swp' \
  --exclude '*.swo' \
  hacklite/metamind-platform/ "$TEMP_DIR/metamind-platform/"

# Make scripts executable
chmod +x "$TEMP_DIR/metamind-platform"/*.sh 2>/dev/null || true

echo -e "${GREEN}✅ Files prepared in: $TEMP_DIR/metamind-platform${NC}"
echo ""
echo -e "${YELLOW}📤 Upload to VPS using:${NC}"
echo "   rsync -avz $TEMP_DIR/metamind-platform/ root@152.42.185.253:/var/www/metamind-platform/"
echo ""
echo -e "${YELLOW}Or use SCP:${NC}"
echo "   scp -r $TEMP_DIR/metamind-platform/* root@152.42.185.253:/var/www/metamind-platform/"
echo ""
echo -e "${GREEN}Then SSH and run:${NC}"
echo "   ssh root@152.42.185.253"
echo "   cd /var/www/metamind-platform"
echo "   chmod +x master-deploy.sh"
echo "   bash master-deploy.sh"


