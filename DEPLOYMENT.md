# Regret Prevention Engine - Single Site Deployment on Render

## 🚀 Deploy as ONE Site (Backend serves Frontend)

### Prerequisites
- GitHub account with your code pushed
- Render account (free at render.com)
- Your Gemini API key

---

## 📦 Single Deployment Steps

### Step 1: Build Frontend Locally

Before deploying, build the React frontend:

```bash
cd frontend
npm install
npm run build
```

This creates a `dist` folder with your built React app.

### Step 2: Commit and Push

```bash
cd ..
git add .
git commit -m "Add production build"
git push origin main
```

### Step 3: Deploy to Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository: `JMadhan1/regret_prevention`

4. **Configure the service:**

   **Basic Settings:**
   - **Name**: `regret-prevention-engine`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: Leave empty (root of repo)
   - **Runtime**: `Python 3`

   **Build & Deploy:**
   - **Build Command**: 
     ```bash
     cd frontend && npm install && npm run build && cd ../backend && pip install -r requirements.txt
     ```
   
   - **Start Command**: 
     ```bash
     cd backend && python api.py
     ```

   **Environment Variables:**
   Click "Add Environment Variable" and add:
   ```
   GEMINI_API_KEY = AIzaSyBAMpKyFfEmKz9rknX3hofYkXMYRI_T590
   FLASK_ENV = production
   FLASK_PORT = 10000
   ```
   
   **Note:** Render uses port 10000 by default for web services.

5. Click **"Create Web Service"**
6. Wait for deployment (5-10 minutes)

---

## ✅ Your App is Live!

**Single URL for everything:**
- `https://regret-prevention-engine.onrender.com` → React Frontend
- `https://regret-prevention-engine.onrender.com/api/health` → Backend API

---

## 🔧 How It Works

The Flask backend now:
1. Serves all `/api/*` routes as API endpoints
2. Serves the built React app for all other routes
3. Everything runs on **one server, one URL**

---

## 🎯 Test Your Deployment

1. Visit: `https://regret-prevention-engine.onrender.com`
2. You should see the Regret Prevention Engine homepage
3. Click "Analyze Your Decision" and test it!

---

## 💰 Cost

**FREE TIER:**
- One Web Service: Free (spins down after 15 min of inactivity)
- Total: **$0/month**

**Note:** Free tier may take 30-60 seconds to wake up on first request.

---

## 🔄 Auto-Deploy

Every time you push to GitHub, Render will:
1. Build the React frontend
2. Install Python dependencies
3. Deploy everything automatically

```bash
git add .
git commit -m "Your changes"
git push origin main
```

---

## 🐛 Troubleshooting

### Build Fails:
- Check build logs in Render dashboard
- Ensure `frontend/package.json` exists
- Verify `backend/requirements.txt` exists

### App Not Loading:
- Check that build created `frontend/dist` folder
- Verify Flask is serving static files correctly
- Check browser console for errors

### API Not Working:
- Test: `https://your-app.onrender.com/api/health`
- Check environment variables are set
- Review logs in Render dashboard

---

## 📊 Monitor Your App

- **Logs**: Render Dashboard → Your Web Service → Logs
- **Metrics**: Render Dashboard → Your Web Service → Metrics
- **Events**: See deployments and builds

---

## 🎉 Advantages of Single Site

✅ Only one URL to manage  
✅ No CORS issues  
✅ Simpler deployment  
✅ Lower cost (one service instead of two)  
✅ Easier to maintain  

---

**Your complete app will be at:**
`https://regret-prevention-engine.onrender.com`

🎊 **One site, one URL, fully deployed!**
