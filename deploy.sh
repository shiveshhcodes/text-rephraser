#!/bin/bash

# 🚀 Text Rephraser Deployment Script
# This script helps prepare your project for Render deployment

echo "🚀 Starting deployment preparation..."

# Check if we're in the right directory
if [ ! -f "package.json" ] && [ ! -d "backend" ] && [ ! -d "frontend" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Error: Git repository not found. Please initialize git first."
    exit 1
fi

echo "✅ Project structure verified"

# Check if backend .env exists
if [ ! -f "backend/.env" ]; then
    echo "❌ Error: backend/.env file not found"
    exit 1
fi

echo "✅ Backend .env file found"

# Check if all required files exist
required_files=(
    "backend/server.js"
    "backend/package.json"
    "backend/render.yaml"
    "frontend/package.json"
    "frontend/render.yaml"
    "frontend/src/lib/gemini.ts"
)

for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ Error: Required file $file not found"
        exit 1
    fi
done

echo "✅ All required files present"

# Test backend locally (optional)
echo "🧪 Testing backend configuration..."
cd backend
if npm test 2>/dev/null; then
    echo "✅ Backend tests passed"
else
    echo "⚠️  Backend tests not configured or failed"
fi
cd ..

# Test frontend build (optional)
echo "🧪 Testing frontend build..."
cd frontend
if npm run build 2>/dev/null; then
    echo "✅ Frontend builds successfully"
else
    echo "❌ Frontend build failed"
    exit 1
fi
cd ..

echo ""
echo "🎉 Deployment preparation completed!"
echo ""
echo "📋 Next steps:"
echo "1. Commit your changes: git add . && git commit -m 'Prepare for deployment'"
echo "2. Push to GitHub: git push origin main"
echo "3. Follow the DEPLOYMENT_GUIDE.md for Render deployment"
echo ""
echo "🔗 Quick links:"
echo "- Render Dashboard: https://dashboard.render.com"
echo "- Deployment Guide: DEPLOYMENT_GUIDE.md"
echo ""
echo "🚀 Ready to deploy!" 