# 🚀 Complete Vercel Deployment Guide for Prompt10X

## 📋 Prerequisites (Complete These First)

### 1. MongoDB Atlas Setup
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Click "Try Free" → Create account
3. Choose "FREE" tier (M0)
4. Create cluster (any cloud provider, closest region)
5. **Database Access**: Add user with password authentication
6. **Network Access**: Allow access from anywhere (0.0.0.0/0)
7. **Get Connection String**: Connect → Connect your application → Copy string

### 2. Google Gemini API Key
1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Sign in with Google account
3. Click "Get API key" → Create new project
4. Copy your API key

---

## 🚀 Step-by-Step Vercel Deployment

### **Step 1: Prepare Your Repository**

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Configure for Vercel deployment"
   git push origin main
   ```

2. **Ensure these files are in your repository:**
   - ✅ `vercel.json` (Vercel configuration)
   - ✅ `api/rewrite.js` (API serverless function)
   - ✅ `package.json` (with backend dependencies)
   - ✅ `src/lib/gemini.ts` (updated for Vercel)

---

### **Step 2: Create Vercel Account**

1. **Go to [Vercel.com](https://vercel.com)**
2. **Click "Sign Up"** (top right)
3. **Choose "Continue with GitHub"** (recommended)
4. **Authorize Vercel** to access your GitHub account

---

### **Step 3: Create New Project**

1. **In Vercel Dashboard:**
   - Click **"New Project"** button (big blue button)

2. **Import Repository:**
   - You'll see your GitHub repositories
   - **Find your project** (text-rephraser)
   - **Click "Import"** next to your project

---

### **Step 4: Configure Project Settings**

**Vercel will ask you these questions - here are the exact answers:**

#### **Question 1: "Framework Preset"**
- **Look for:** Dropdown menu with framework options
- **Select:** `Vite` (not React, not Next.js)
- **Why:** Your project uses Vite as the build tool

#### **Question 2: "Root Directory"**
- **Leave empty** (just press Enter)
- **Why:** Your project is in the root directory

#### **Question 3: "Build Command"**
- **Type:** `npm run build`
- **Why:** This builds your React app

#### **Question 4: "Output Directory"**
- **Type:** `dist`
- **Why:** Vite outputs to the `dist` folder

#### **Question 5: "Install Command"**
- **Type:** `npm install`
- **Why:** Standard npm install

#### **Question 6: "Development Command"**
- **Type:** `npm run dev`
- **Why:** For local development

---

### **Step 5: Set Environment Variables**

**BEFORE clicking "Deploy", you need to set environment variables:**

1. **Look for "Environment Variables" section**
2. **Click "Add" button** (you'll add 3 variables)

#### **Variable 1: MONGO_URI**
- **Name:** `MONGO_URI`
- **Value:** `mongodb+srv://your_username:your_password@your_cluster.mongodb.net/prompt10x?retryWrites=true&w=majority`
- **Environment:** Select all three (Production, Preview, Development)

#### **Variable 2: GEMINI_API_KEY**
- **Name:** `GEMINI_API_KEY`
- **Value:** `your_gemini_api_key_here`
- **Environment:** Select all three (Production, Preview, Development)

#### **Variable 3: NODE_ENV**
- **Name:** `NODE_ENV`
- **Value:** `production`
- **Environment:** Select all three (Production, Preview, Development)

---

### **Step 6: Deploy**

1. **Click "Deploy" button** (big blue button)
2. **Wait for build** (2-5 minutes)
3. **Watch the build logs** - you'll see:
   - Installing dependencies
   - Building frontend
   - Setting up API functions

---

### **Step 7: Check Deployment**

1. **When build completes:**
   - You'll see "Visit" button
   - Click it to open your live site

2. **Your site will be at:** `https://your-project-name.vercel.app`

---

### **Step 8: Test Your Application**

1. **Visit your Vercel URL**
2. **Test the text rewriting:**
   - Enter some text
   - Select a tone (Professional, Friendly, Technical)
   - Click "Rewrite Text"
   - Should work with real AI

3. **Check for errors:**
   - Open browser console (F12)
   - Look for any red error messages

---

## 🔧 Troubleshooting Common Issues

### **Issue 1: "Build Failed"**
**Check:**
1. Go to your project in Vercel dashboard
2. Click "Deployments" tab
3. Click on failed deployment
4. Check build logs for specific errors

**Common fixes:**
- Ensure all dependencies are in `package.json`
- Check if `vercel.json` is correct
- Verify `api/rewrite.js` exists

### **Issue 2: "API Not Working"**
**Check:**
1. Go to "Functions" tab in Vercel dashboard
2. Look for `/api/v1/rewrite` function
3. Check function logs for errors

**Common fixes:**
- Verify environment variables are set
- Check MongoDB connection string
- Ensure Gemini API key is correct

### **Issue 3: "MongoDB Connection Error"**
**Check:**
1. Verify `MONGO_URI` in Vercel environment variables
2. Ensure MongoDB Atlas network access allows all IPs
3. Check database user permissions

### **Issue 4: "Gemini API Error"**
**Check:**
1. Verify `GEMINI_API_KEY` in Vercel environment variables
2. Ensure API key has proper permissions
3. Check if API key is valid

---

## 📊 Monitoring Your Deployment

### **Check Vercel Dashboard:**
1. **Analytics:** Monitor traffic and performance
2. **Functions:** Check API function logs
3. **Deployments:** See all deployment history

### **Check MongoDB Atlas:**
1. **Database:** See your data and collections
2. **Performance:** Monitor connection and usage
3. **Logs:** Check for any connection issues

---

## 🎉 Success Indicators

Your deployment is successful when:

✅ **Frontend loads** without errors
✅ **Text rewriting works** with real AI responses
✅ **No console errors** in browser
✅ **API functions show** in Vercel Functions tab
✅ **MongoDB connection** established
✅ **Gemini API calls** successful

---

## 🔄 Continuous Deployment

**Every time you push to GitHub:**
1. Vercel automatically detects changes
2. Builds and deploys new version
3. Your site updates automatically

**For preview deployments:**
1. Create pull request on GitHub
2. Vercel creates preview deployment
3. Test changes before merging

---

## 📞 Need Help?

**If you encounter issues:**
1. Check Vercel build logs
2. Check browser console for errors
3. Verify environment variables
4. Test API endpoints manually
5. Check MongoDB Atlas logs

**Your Prompt10X application should now be live and fully functional! 🚀** 