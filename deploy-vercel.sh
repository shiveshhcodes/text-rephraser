#!/bin/bash

# 🚀 Vercel Deployment Script
# This script helps prepare and deploy the frontend to Vercel

echo "🚀 Starting Vercel deployment preparation..."

# Check if we're in the right directory
if [ ! -d "frontend" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

echo "✅ Project structure verified"

# Check if frontend builds successfully
echo "🧪 Testing frontend build..."
cd frontend
if npm run build; then
    echo "✅ Frontend builds successfully"
else
    echo "❌ Frontend build failed"
    exit 1
fi
cd ..

# Check if vercel.json exists
if [ ! -f "frontend/vercel.json" ]; then
    echo "❌ Error: frontend/vercel.json not found"
    exit 1
fi

echo "✅ Vercel configuration found"

# Test backend connection
echo "🧪 Testing backend connection..."
BACKEND_RESPONSE=$(curl -s -X POST https://prompt-10x.onrender.com/api/v1/rewrite \
  -H "Content-Type: application/json" \
  -d '{"text": "test", "tone": "professional"}' 2>/dev/null)

if [[ $BACKEND_RESPONSE == *"rewrittenText"* ]]; then
    echo "✅ Backend API is working correctly"
else
    echo "⚠️  Backend API might have issues"
fi

echo ""
echo "🎉 Vercel deployment preparation completed!"
echo ""
echo "📋 Next steps:"
echo "1. Commit your changes: git add . && git commit -m 'Prepare for Vercel deployment'"
echo "2. Push to GitHub: git push origin main"
echo "3. Deploy to Vercel:"
echo "   - Go to https://vercel.com/dashboard"
echo "   - Import your GitHub repository"
echo "   - Set Root Directory to 'frontend'"
echo "   - Add environment variable: VITE_BACKEND_URL = https://prompt-10x.onrender.com"
echo "   - Deploy!"
echo ""
echo "🔗 Quick links:"
echo "- Vercel Dashboard: https://vercel.com/dashboard"
echo "- Render Backend: https://prompt-10x.onrender.com"
echo "- Vercel Guide: VERCEL_DEPLOYMENT_GUIDE.md"
echo ""
echo "🚀 Ready to deploy to Vercel!" 