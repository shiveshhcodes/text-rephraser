# 🚀 Complete Render Deployment Guide

## 📋 Prerequisites
- ✅ GitHub repository with your code
- ✅ Render account (free tier available)
- ✅ MongoDB Atlas database (already configured)
- ✅ Updated Gemini API key (already done)

---

## 🔧 Step 1: Prepare Your Repository

### 1.1 Commit and Push Your Changes
```bash
# Add all changes
git add .

# Commit with descriptive message
git commit -m "Prepare for Render deployment - Updated API config and render.yaml files"

# Push to GitHub
git push origin main
```

---

## 🌐 Step 2: Deploy Backend First

### 2.1 Create Backend Service on Render

1. **Go to Render Dashboard**
   - Visit [render.com](https://render.com)
   - Sign in to your account

2. **Create New Web Service**
   - Click "New +" button
   - Select "Web Service"
   - Connect your GitHub repository

3. **Configure Backend Service**
   ```
   Name: text-rephraser-backend
   Root Directory: backend
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   ```

4. **Set Environment Variables**
   - Click "Environment" tab
   - Add these variables:
   ```
   NODE_ENV = production
   MONGO_URI = mongodb+srv://promptuser:shibu2506@cluster0.ocz33t1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   GEMINI_API_KEY = AIzaSyAKSPTp7E9D-sKofYz1Ni5sNlHL-MR0WRQ
   PORT = 10000
   ```

5. **Deploy Backend**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note the URL: `https://text-rephraser-backend.onrender.com`

---

## 🎨 Step 3: Deploy Frontend

### 3.1 Create Frontend Service on Render

1. **Create Another Web Service**
   - Click "New +" button again
   - Select "Web Service"
   - Connect the same GitHub repository

2. **Configure Frontend Service**
   ```
   Name: text-rephraser-frontend
   Root Directory: frontend
   Environment: Static Site
   Build Command: npm install && npm run build
   Start Command: npm run preview
   Static Publish Path: ./dist
   ```

3. **Set Environment Variables**
   - Click "Environment" tab
   - Add these variables:
   ```
   NODE_ENV = production
   VITE_BACKEND_URL = https://text-rephraser-backend.onrender.com
   ```

4. **Deploy Frontend**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note the URL: `https://text-rephraser-frontend.onrender.com`

---

## 🔗 Step 4: Link Frontend and Backend

### 4.1 Update Frontend Backend URL
After backend deployment, update the frontend environment variable:

1. **Go to Frontend Service**
   - In Render dashboard, go to your frontend service
   - Click "Environment" tab
   - Update `VITE_BACKEND_URL` to your actual backend URL

2. **Redeploy Frontend**
   - Click "Manual Deploy" → "Deploy latest commit"

---

## 🧪 Step 5: Test Your Deployment

### 5.1 Test Backend API
```bash
# Test backend health
curl https://text-rephraser-backend.onrender.com/api/v1/rewrite

# Test with sample data
curl -X POST https://text-rephraser-backend.onrender.com/api/v1/rewrite \
  -H "Content-Type: application/json" \
  -d '{"text": "hello world", "tone": "professional"}'
```

### 5.2 Test Frontend
- Visit your frontend URL
- Try the text rewriter functionality
- Check browser console for any errors

---

## 🔧 Step 6: Troubleshooting

### Common Issues and Solutions

#### 6.1 Backend Issues
**Problem**: Backend fails to start
**Solution**: 
- Check MongoDB connection string
- Verify Gemini API key
- Check logs in Render dashboard

**Problem**: CORS errors
**Solution**: 
- Backend already has CORS configured
- Check if frontend URL is in allowed origins

#### 6.2 Frontend Issues
**Problem**: Frontend can't connect to backend
**Solution**:
- Verify `VITE_BACKEND_URL` environment variable
- Check if backend URL is correct
- Ensure backend is running

**Problem**: Build fails
**Solution**:
- Check Node.js version (should be 18+)
- Verify all dependencies are in package.json
- Check build logs in Render

#### 6.3 Environment Variables
**Problem**: Environment variables not working
**Solution**:
- Double-check variable names (case-sensitive)
- Ensure variables are set in correct service
- Redeploy after changing environment variables

---

## 📊 Step 7: Monitor and Maintain

### 7.1 Set Up Monitoring
- Enable Render's built-in monitoring
- Set up alerts for service downtime
- Monitor API usage and performance

### 7.2 Regular Maintenance
- Keep dependencies updated
- Monitor MongoDB usage
- Check Gemini API usage limits

---

## 🎯 Final URLs

After successful deployment, you should have:

- **Backend API**: `https://text-rephraser-backend.onrender.com`
- **Frontend App**: `https://text-rephraser-frontend.onrender.com`

---

## 🚀 Quick Deployment Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible  
- [ ] Environment variables configured
- [ ] API endpoints working
- [ ] Frontend can connect to backend
- [ ] Text rewriter functionality working
- [ ] No console errors
- [ ] Mobile responsiveness working

---

## 📞 Support

If you encounter issues:
1. Check Render deployment logs
2. Verify environment variables
3. Test API endpoints manually
4. Check browser console for errors
5. Ensure all dependencies are properly installed

Your full-stack application should now be live and fully functional! 🎉 