# Regret Prevention Engine

A web application that analyzes patterns in what people regret most and predicts future regrets based on current decisions.

## 🎯 Overview

The Regret Prevention Engine helps users make better decisions by:
- Analyzing thousands of real regret stories from Reddit
- Using Claude AI to extract patterns and insights
- Matching user situations to similar past experiences
- Calculating regret probability for each decision option
- Providing data-driven recommendations

## 🏗️ Architecture

### Backend (Python/Flask)
- **scraper.py**: Reddit API integration using PRAW
- **pattern_extractor.py**: Claude AI pattern extraction
- **matcher.py**: Decision analysis and matching algorithm
- **api.py**: REST API endpoints

### Frontend (React/Tailwind)
- **QuestionnaireForm**: User input collection
- **RegretAnalysis**: Results display with visualizations
- **PatternVisualization**: Database statistics and charts

## 📋 Prerequisites

- Python 3.8+
- Node.js 16+
- Claude API key (Anthropic)
- Reddit API credentials (optional, for scraping)

## 🚀 Quick Start

### 1. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
copy .env.example .env
# Edit .env and add your API keys:
# - ANTHROPIC_API_KEY (required)
# - REDDIT_CLIENT_ID (optional, for scraping)
# - REDDIT_CLIENT_SECRET (optional, for scraping)

# Start the backend server
python api.py
```

The backend will run on `http://localhost:5000`

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will run on `http://localhost:3000`

## 📊 Initial Data Setup

The project includes sample data in `data/regret_patterns.json` with 25 example patterns. To use real data:

### Option 1: Use Sample Data (Recommended for Testing)
The sample data is already included and ready to use!

### Option 2: Scrape Real Data

1. **Configure Reddit API credentials** in `.env`
2. **Run the scraper**:
   ```bash
   cd backend
   python scraper.py
   ```
3. **Extract patterns with Claude AI**:
   ```bash
   python pattern_extractor.py
   ```

### Option 3: Use API Endpoints

```bash
# Scrape Reddit data
curl -X POST http://localhost:5000/api/scrape \
  -H "Content-Type: application/json" \
  -d '{"posts_per_subreddit": 100}'

# Extract patterns
curl -X POST http://localhost:5000/api/extract \
  -H "Content-Type: application/json" \
  -d '{"limit": 50}'
```

## 🔑 API Endpoints

### GET /api/health
Health check endpoint

### POST /api/analyze
Analyze a decision and get regret predictions

**Request Body:**
```json
{
  "age": 25,
  "situation": "Current life situation",
  "decision_description": "Decision I'm facing",
  "options": ["Option 1", "Option 2", "Option 3"],
  "goals": "My life goals and values",
  "timeline": "1-3 months",
  "category": "career"
}
```

**Response:**
```json
{
  "options_analysis": [
    {
      "option": "Option 1",
      "regret_probability": 45,
      "regret_severity": 6,
      "timeline": "2-5 years",
      "key_insights": ["..."],
      "quotes_examples": ["..."],
      "pros": ["..."],
      "cons": ["..."]
    }
  ],
  "recommendation": {
    "suggested_option": "Option 2",
    "reasoning": "...",
    "confidence": 75
  },
  "hidden_factors": ["..."],
  "overall_insights": ["..."]
}
```

### GET /api/patterns
Get pattern database statistics

### GET /api/categories
Get patterns grouped by category

## 🎨 Features

### User Features
- ✅ Conversational questionnaire interface
- ✅ AI-powered decision analysis
- ✅ Regret probability calculations
- ✅ Timeline predictions
- ✅ Real quotes from similar situations
- ✅ Data visualizations
- ✅ Personalized recommendations

### Technical Features
- ✅ Claude Sonnet 4 integration
- ✅ Reddit data scraping (PRAW)
- ✅ Pattern matching algorithm
- ✅ Responsive Tailwind UI
- ✅ Interactive charts (Recharts)
- ✅ REST API architecture

## 🎯 Usage Example

1. **Open the app** at `http://localhost:3000`
2. **Click "Analyze Your Decision"**
3. **Fill out the questionnaire**:
   - Age: 28
   - Category: Career
   - Situation: "I have a stable corporate job but want to start my own business"
   - Decision: "Should I quit my job to pursue entrepreneurship?"
   - Options: "Stay in job", "Quit and start business", "Start part-time"
   - Goals: "Financial independence and creative fulfillment"
4. **Submit and view analysis** with regret probabilities, insights, and recommendations

## 🛠️ Development

### Backend Development
```bash
cd backend
python api.py  # Runs with auto-reload
```

### Frontend Development
```bash
cd frontend
npm run dev  # Runs with hot reload
```

### Build for Production
```bash
cd frontend
npm run build
```

## 📁 Project Structure

```
regret-prevention-engine/
├── backend/
│   ├── api.py                 # Flask REST API
│   ├── scraper.py            # Reddit scraping
│   ├── pattern_extractor.py  # Claude AI extraction
│   ├── matcher.py            # Pattern matching
│   ├── requirements.txt      # Python dependencies
│   └── .env.example          # Environment template
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── QuestionnaireForm.jsx
│   │   │   ├── RegretAnalysis.jsx
│   │   │   └── PatternVisualization.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── data/
│   └── regret_patterns.json  # Pattern database
└── README.md
```

## 🔐 Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Required
ANTHROPIC_API_KEY=your_claude_api_key_here

# Optional (for scraping new data)
REDDIT_CLIENT_ID=your_reddit_client_id
REDDIT_CLIENT_SECRET=your_reddit_client_secret
REDDIT_USER_AGENT=RegretPreventionEngine/1.0

# Server config
FLASK_ENV=development
FLASK_PORT=5000
```

## 🚢 Deployment

### Backend (Render/Railway/Heroku)
1. Connect GitHub repository
2. Set environment variables
3. Deploy command: `pip install -r requirements.txt && python api.py`

### Frontend (Vercel/Netlify)
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Update API URL in production

## 🤝 Contributing

Contributions are welcome! Areas for improvement:
- Additional data sources beyond Reddit
- More sophisticated matching algorithms
- User accounts and saved analyses
- Mobile app version
- More visualization options

## 📝 License

MIT License - feel free to use for personal or commercial projects

## 🙏 Acknowledgments

- Data sourced from Reddit communities
- Powered by Claude AI (Anthropic)
- Built with React and Tailwind CSS
- Charts by Recharts

## 📧 Support

For issues or questions, please open a GitHub issue.

---

**Made with ❤️ to help people make better decisions**
# regret_prevention
