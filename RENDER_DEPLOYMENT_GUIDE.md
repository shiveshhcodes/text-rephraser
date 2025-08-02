# 🚀 Complete Render Deployment Guide for Prompt10X

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

## 🚀 Step-by-Step Render Deployment

### **Step 1: Prepare Your Repository**

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Configure for Render deployment"
   git push origin main
   ```

2. **Ensure these files are in your repository:**
   - ✅ `render.yaml` (Render configuration)
   - ✅ `prompt-engine-backend/package.json` (updated)
   - ✅ `prompt-engine-backend/server.js`
   - ✅ `src/lib/gemini.ts` (updated for Render)

---

### **Step 2: Create Render Account**

1. **Go to [Render.com](https://render.com)**
2. **Click "Get Started"** (top right)
3. **Choose "Continue with GitHub"** (recommended)
4. **Authorize Render** to access your GitHub account

---

### **Step 3: Deploy Backend Service**

1. **In Render Dashboard:**
   - Click **"New +"** button (top right)
   - Select **"Web Service"**

2. **Connect Repository:**
   - Choose your GitHub repository (text-rephraser)
   - Click **"Connect"**

3. **Configure Backend Service:**
   - **Name:** `prompt10x-backend`
   - **Environment:** `Node`
   - **Region:** Choose closest to your users
   - **Branch:** `main`
   - **Root Directory:** `prompt-engine-backend`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`

4. **Set Environment Variables:**
   - Click **"Environment"** tab
   - Add these variables:
     ```
     MONGO_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/prompt10x?retryWrites=true&w=majority
     GEMINI_API_KEY=your_gemini_api_key_here
     NODE_ENV=production
     ```

5. **Deploy Backend:**
   - Click **"Create Web Service"**
   - Wait for deployment (2-5 minutes)
   - Note your backend URL: `https://prompt10x-backend.onrender.com`

---

### **Step 4: Deploy Frontend Service**

1. **Create Another Web Service:**
   - Click **"New +"** again
   - Select **"Static Site"**

2. **Configure Frontend Service:**
   - **Name:** `prompt10x-frontend`
   - **Repository:** Same GitHub repository
   - **Branch:** `main`
   - **Root Directory:** Leave empty (root)
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`

3. **Set Environment Variables:**
   - Add this variable:
     ```
     NODE_ENV=production
     ```

4. **Deploy Frontend:**
   - Click **"Create Static Site"**
   - Wait for deployment (2-5 minutes)
   - Your frontend will be at: `https://prompt10x-frontend.onrender.com`

---

### **Step 5: Configure Domain (Optional)**

1. **In Frontend Service Settings:**
   - Go to your frontend service dashboard
   - Click **"Settings"** tab
   - Scroll to **"Custom Domains"**
   - Add your custom domain if you have one

---

### **Step 6: Test Your Deployment**

1. **Test Backend API:**
   - Visit: `https://prompt10x-backend.onrender.com/api/v1/rewrite`
   - Should show API endpoint info

2. **Test Frontend:**
   - Visit your frontend URL
   - Test the text rewriting functionality
   - Check browser console for errors

3. **Test Full Integration:**
   - Enter text in the frontend
   - Select a tone
   - Click "Rewrite Text"
   - Should work with real AI

---

## 🔧 Troubleshooting Common Issues

### **Issue 1: "Build Failed"**
**Check:**
1. Go to your service in Render dashboard
2. Click "Logs" tab
3. Check build logs for specific errors

**Common fixes:**
- Ensure all dependencies are in `package.json`
- Check if `render.yaml` is correct
- Verify Node.js version compatibility

### **Issue 2: "Backend Not Responding"**
**Check:**
1. Go to backend service dashboard
2. Click "Logs" tab
3. Check for MongoDB connection errors

**Common fixes:**
- Verify `MONGO_URI` in environment variables
- Ensure MongoDB Atlas network access allows all IPs
- Check database user permissions

### **Issue 3: "Frontend Can't Connect to Backend"**
**Check:**
1. Verify backend URL in `src/lib/gemini.ts`
2. Check CORS settings in backend
3. Ensure environment variables are set

### **Issue 4: "Gemini API Error"**
**Check:**
1. Verify `GEMINI_API_KEY` in backend environment variables
2. Ensure API key has proper permissions
3. Check if API key is valid

---

## 📊 Monitoring Your Deployment

### **Check Render Dashboard:**
1. **Services:** Monitor both frontend and backend
2. **Logs:** Check for any errors or issues
3. **Metrics:** Monitor performance and usage

### **Check MongoDB Atlas:**
1. **Database:** See your data and collections
2. **Performance:** Monitor connection and usage
3. **Logs:** Check for any connection issues

---

## 🎉 Success Indicators

Your deployment is successful when:

✅ **Backend responds** at `https://prompt10x-backend.onrender.com`
✅ **Frontend loads** without errors
✅ **Text rewriting works** with real AI responses
✅ **No console errors** in browser
✅ **MongoDB connection** established
✅ **Gemini API calls** successful

---

## 🔄 Continuous Deployment

**Every time you push to GitHub:**
1. Render automatically detects changes
2. Builds and deploys new version
3. Your services update automatically

**For preview deployments:**
1. Create pull request on GitHub
2. Render creates preview deployment
3. Test changes before merging

---

## 💰 Render Pricing

**Free Tier Includes:**
- ✅ 750 hours/month for web services
- ✅ Static sites (unlimited)
- ✅ Automatic deployments
- ✅ Custom domains
- ✅ SSL certificates

**For Production:**
- Consider upgrading to paid plan for more resources
- Better performance and reliability

---

## 📞 Need Help?

**If something goes wrong:**
1. Check Render build logs
2. Check browser console for errors
3. Verify environment variables
4. Test API endpoints manually
5. Check MongoDB Atlas logs

**Your Prompt10X application should now be live and fully functional on Render! 🚀** 