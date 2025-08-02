# 🚀 Complete Vercel Deployment Guide for Prompt10X

## 📋 Prerequisites
- Vercel account (free tier works)
- MongoDB Atlas account (free tier works)
- Google Gemini API key
- Git repository with your code

---

## 🔧 Step 1: Prepare Your Environment Variables

### Create a `.env.local` file in your project root:
```env
# MongoDB Connection String
MONGO_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/prompt10x?retryWrites=true&w=majority

# Google Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here

# Optional: Node Environment
NODE_ENV=production
```

---

## 🗄️ Step 2: Set Up MongoDB Atlas

### 2.1 Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Click "Try Free" and create account
3. Choose "Free" tier (M0)

### 2.2 Create Database Cluster
1. Click "Build a Database"
2. Choose "FREE" tier
3. Select your preferred cloud provider (AWS/Google Cloud/Azure)
4. Choose region closest to your users
5. Click "Create"

### 2.3 Set Up Database Access
1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create username and password (save these!)
5. Select "Read and write to any database"
6. Click "Add User"

### 2.4 Set Up Network Access
1. Go to "Network Access" in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for Vercel)
4. Click "Confirm"

### 2.5 Get Connection String
1. Go to "Database" in left sidebar
2. Click "Connect"
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your actual password
6. Replace `<dbname>` with `prompt10x`

---

## 🔑 Step 3: Get Google Gemini API Key

### 3.1 Create Google AI Studio Account
1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Sign in with your Google account
3. Click "Get API key"
4. Create a new project or select existing
5. Copy your API key

---

## 🚀 Step 4: Deploy to Vercel

### 4.1 Connect Your Repository
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your Git repository
4. Select the repository containing your project

### 4.2 Configure Project Settings

**Vercel will ask you these questions - here are the answers:**

#### ❓ **Framework Preset**
- **Answer:** `Vite`
- **Why:** Your project uses Vite as the build tool

#### ❓ **Root Directory**
- **Answer:** `./` (leave empty)
- **Why:** Your project is in the root directory

#### ❓ **Build Command**
- **Answer:** `npm run build`
- **Why:** This builds your React app

#### ❓ **Output Directory**
- **Answer:** `dist`
- **Why:** Vite outputs to the `dist` folder

#### ❓ **Install Command**
- **Answer:** `npm install`
- **Why:** Standard npm install

#### ❓ **Development Command**
- **Answer:** `npm run dev`
- **Why:** For local development

### 4.3 Set Environment Variables in Vercel

**In the Vercel dashboard, go to your project settings:**

1. Click on your project
2. Go to "Settings" tab
3. Click "Environment Variables"
4. Add these variables:

```
Name: MONGO_URI
Value: mongodb+srv://your_username:your_password@your_cluster.mongodb.net/prompt10x?retryWrites=true&w=majority
Environment: Production, Preview, Development

Name: GEMINI_API_KEY
Value: your_gemini_api_key_here
Environment: Production, Preview, Development

Name: NODE_ENV
Value: production
Environment: Production, Preview, Development
```

### 4.4 Deploy
1. Click "Deploy"
2. Wait for build to complete (2-5 minutes)
3. Your app will be live at `https://your-project-name.vercel.app`

---

## 🔧 Step 5: Update Frontend API Configuration

### 5.1 Update API Base URL
In your frontend code, update the API calls to use your Vercel domain:

```typescript
// In src/lib/gemini.ts or wherever you make API calls
const API_BASE_URL = 'https://your-project-name.vercel.app/api/v1';

// Update your fetch calls to use this base URL
```

### 5.2 Test Your Deployment
1. Visit your Vercel URL
2. Test the text rewriting functionality
3. Check browser console for any errors
4. Verify MongoDB connection in Vercel logs

---

## 🐛 Troubleshooting Common Issues

### Issue 1: "MongoDB Connection Error"
**Solution:**
- Check your MONGO_URI in Vercel environment variables
- Ensure MongoDB Atlas network access allows all IPs
- Verify database user has correct permissions

### Issue 2: "Gemini API Error"
**Solution:**
- Verify GEMINI_API_KEY is set correctly in Vercel
- Check if API key has proper permissions
- Ensure you're using the correct API endpoint

### Issue 3: "Build Failed"
**Solution:**
- Check Vercel build logs for specific errors
- Ensure all dependencies are in package.json
- Verify Node.js version compatibility

### Issue 4: "API Routes Not Working"
**Solution:**
- Ensure your `api/server.js` file is in the correct location
- Check Vercel function logs for errors
- Verify CORS settings are correct

---

## 📊 Step 6: Monitor Your Deployment

### 6.1 Check Vercel Analytics
1. Go to your project dashboard
2. Click "Analytics" tab
3. Monitor performance and usage

### 6.2 Check Function Logs
1. Go to "Functions" tab in Vercel dashboard
2. Click on your API function
3. Check for any errors or issues

### 6.3 Monitor MongoDB Atlas
1. Go to MongoDB Atlas dashboard
2. Check database usage and performance
3. Monitor connection logs

---

## 🔄 Step 7: Continuous Deployment

### 7.1 Automatic Deployments
- Every push to your main branch will trigger a new deployment
- Vercel automatically builds and deploys your changes

### 7.2 Preview Deployments
- Pull requests create preview deployments
- Test changes before merging to main

---

## 🎉 Success Checklist

- ✅ MongoDB Atlas database created and connected
- ✅ Google Gemini API key configured
- ✅ Vercel project deployed successfully
- ✅ Environment variables set correctly
- ✅ API endpoints working
- ✅ Frontend can communicate with backend
- ✅ Text rewriting functionality working
- ✅ Database seeding completed

---

## 📞 Support

If you encounter issues:
1. Check Vercel build logs
2. Check MongoDB Atlas logs
3. Verify environment variables
4. Test API endpoints manually
5. Check browser console for frontend errors

Your Prompt10X application should now be live and fully functional! 🚀 