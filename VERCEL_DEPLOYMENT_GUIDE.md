# 🚀 Vercel + Render Deployment Guide

## 📋 Overview
- **Backend**: Deployed on Render at `https://prompt-10x.onrender.com`
- **Frontend**: Deploy to Vercel (this guide)
- **Architecture**: Frontend on Vercel, Backend on Render

---

## 🎯 Step 1: Prepare Frontend for Vercel

### 1.1 Update Environment Variables
The frontend is already configured to use your Render backend URL:
```javascript
// frontend/src/lib/gemini.ts
const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://prompt-10x.onrender.com';
```

### 1.2 Vercel Configuration
Created `frontend/vercel.json` with:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "installCommand": "npm install",
  "devCommand": "npm run dev",
  "env": {
    "VITE_BACKEND_URL": "https://prompt-10x.onrender.com"
  }
}
```

---

## 🌐 Step 2: Deploy to Vercel

### 2.1 Install Vercel CLI (Optional)
```bash
npm install -g vercel
```

### 2.2 Deploy via Vercel Dashboard (Recommended)

1. **Go to [vercel.com](https://vercel.com)**
   - Sign in with GitHub
   - Click "New Project"

2. **Import Your Repository**
   - Select your GitHub repository
   - Vercel will auto-detect it's a Vite project

3. **Configure Project Settings**
   ```
   Framework Preset: Vite
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Set Environment Variables**
   - Click "Environment Variables"
   - Add:
   ```
   VITE_BACKEND_URL = https://prompt-10x.onrender.com
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Get your frontend URL: `https://your-app-name.vercel.app`

### 2.3 Deploy via CLI (Alternative)
```bash
cd frontend
vercel --prod
```

---

## 🔗 Step 3: Link Frontend and Backend

### 3.1 Test Backend Connection
```bash
# Test your Render backend
curl https://prompt-10x.onrender.com/api/v1/rewrite

# Test with sample data
curl -X POST https://prompt-10x.onrender.com/api/v1/rewrite \
  -H "Content-Type: application/json" \
  -d '{"text": "hello world", "tone": "professional"}'
```

### 3.2 Test Frontend
- Visit your Vercel frontend URL
- Try the text rewriter functionality
- Check browser console for any CORS errors

---

## 🔧 Step 4: Troubleshooting

### 4.1 CORS Issues
If you get CORS errors, ensure your Render backend has proper CORS configuration:

```javascript
// In backend/server.js (already configured)
app.use(cors());
```

### 4.2 Environment Variables
- Verify `VITE_BACKEND_URL` is set in Vercel dashboard
- Check that the URL is correct: `https://prompt-10x.onrender.com`

### 4.3 Build Issues
- Ensure all dependencies are in `package.json`
- Check Vercel build logs for errors
- Verify Node.js version compatibility

---

## 🎯 Step 5: Final Configuration

### 5.1 Custom Domain (Optional)
1. Go to Vercel project settings
2. Click "Domains"
3. Add your custom domain

### 5.2 Environment Variables in Vercel
1. Go to project settings
2. Click "Environment Variables"
3. Add:
   ```
   VITE_BACKEND_URL = https://prompt-10x.onrender.com
   ```

### 5.3 Auto-Deploy
- Vercel will automatically deploy when you push to GitHub
- Each push to main branch triggers a new deployment

---

## 📊 Step 6: Monitor and Maintain

### 6.1 Vercel Analytics
- Enable Vercel Analytics in project settings
- Monitor performance and usage

### 6.2 Backend Monitoring
- Monitor Render backend performance
- Check MongoDB usage
- Monitor Gemini API usage

---

## 🎯 Expected Results

After successful deployment:

- **Frontend**: `https://your-app-name.vercel.app`
- **Backend**: `https://prompt-10x.onrender.com`
- **Full Stack**: Frontend on Vercel, Backend on Render
- **Performance**: Fast frontend with reliable backend

---

## 🚀 Quick Deployment Checklist

- [ ] Frontend builds successfully locally
- [ ] Vercel project created and configured
- [ ] Environment variables set in Vercel
- [ ] Backend URL correctly configured
- [ ] Frontend deployed to Vercel
- [ ] API communication working
- [ ] Text rewriter functionality working
- [ ] No console errors
- [ ] Mobile responsiveness working

---

## 🔗 Quick Links

- 🚀 [Vercel Dashboard](https://vercel.com/dashboard)
- 📖 [Vercel Documentation](https://vercel.com/docs)
- 🔧 [Render Backend](https://prompt-10x.onrender.com)
- 📝 [Vercel Configuration](frontend/vercel.json)

---

## 💡 Benefits of Vercel + Render Setup

### Vercel Frontend Benefits:
- ⚡ Lightning-fast global CDN
- 🔄 Automatic deployments
- 📱 Excellent React/Vite support
- 🎨 Built-in analytics
- 🔒 SSL certificates included

### Render Backend Benefits:
- 🗄️ Reliable database hosting
- 🔌 Easy environment management
- 📊 Good monitoring tools
- 💰 Free tier available

---

**Your full-stack application will be deployed with the best of both platforms! 🎉** 