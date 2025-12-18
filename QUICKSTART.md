# Regret Prevention Engine - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Set Up Backend

1. **Navigate to backend folder**:
   ```bash
   cd backend
   ```

2. **Create and activate virtual environment**:
   ```bash
   # Create virtual environment
   python -m venv venv
   
   # Activate it (Windows)
   venv\Scripts\activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure API key**:
   - Copy `.env.example` to `.env`
   - Open `.env` and add your Claude API key:
     ```
     ANTHROPIC_API_KEY=your_actual_api_key_here
     ```
   - Get your API key from: https://console.anthropic.com/

5. **Start the backend**:
   ```bash
   python api.py
   ```
   
   ✅ Backend should now be running on `http://localhost:5000`

### Step 2: Set Up Frontend

1. **Open a NEW terminal** and navigate to frontend folder:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   
   ✅ Frontend should now be running on `http://localhost:3000`

### Step 3: Use the Application

1. **Open your browser** to `http://localhost:3000`
2. **Click "Analyze Your Decision"**
3. **Fill out the questionnaire** with a real or hypothetical decision
4. **View your personalized regret analysis!**

## 📊 Sample Data

The application comes with **25 sample regret patterns** already loaded in `data/regret_patterns.json`. This is perfect for testing and demonstration!

## 🔑 Getting API Keys

### Claude API Key (Required)
1. Go to https://console.anthropic.com/
2. Sign up or log in
3. Navigate to API Keys
4. Create a new key
5. Copy it to your `.env` file

### Reddit API (Optional - Only for Scraping New Data)
1. Go to https://www.reddit.com/prefs/apps
2. Click "Create App" or "Create Another App"
3. Select "script"
4. Fill in the details
5. Copy Client ID and Secret to `.env`

## 🎯 Test Example

Try this example decision:

- **Age**: 28
- **Category**: Career
- **Situation**: "I have a stable corporate job paying $80k/year. I've been offered a position at a startup with lower salary ($60k) but equity and more responsibility."
- **Decision**: "Should I leave my stable job for the startup opportunity?"
- **Options**: 
  - "Stay at current job"
  - "Take the startup job"
  - "Negotiate better terms at current job"
- **Goals**: "Financial security, career growth, and work I'm passionate about"
- **Timeline**: "1-3 months"

## 🐛 Troubleshooting

### Backend won't start
- Make sure virtual environment is activated
- Check that all dependencies installed: `pip install -r requirements.txt`
- Verify `.env` file exists with ANTHROPIC_API_KEY

### Frontend won't start
- Delete `node_modules` and run `npm install` again
- Make sure you're using Node.js 16 or higher: `node --version`

### "Pattern database not initialized" error
- The sample data should be in `data/regret_patterns.json`
- Check that the file exists and is valid JSON

### API calls failing
- Make sure backend is running on port 5000
- Check browser console for errors
- Verify ANTHROPIC_API_KEY is set correctly

## 📝 Next Steps

1. **Customize the UI**: Edit files in `frontend/src/`
2. **Add more patterns**: Run the scraper or manually add to `data/regret_patterns.json`
3. **Improve matching**: Modify the algorithm in `backend/matcher.py`
4. **Deploy**: Follow deployment instructions in README.md

## 💡 Tips

- The sample data is enough to test all features
- Claude API calls cost money - start with small tests
- Reddit scraping is rate-limited - be patient
- The UI is fully responsive - try it on mobile!

---

**Need help?** Check the full README.md for detailed documentation.
