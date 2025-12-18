# Regret Prevention Engine - Project Overview

## 🎯 Project Vision

The Regret Prevention Engine is an AI-powered decision support system that helps people avoid future regrets by analyzing patterns from thousands of real regret stories. It combines data science, AI, and behavioral psychology to provide actionable insights.

## ✅ MVP Feature Checklist

### Core Features (Implemented)

#### Backend
- [x] **Reddit Scraping** (`scraper.py`)
  - Multi-subreddit support (r/regret, r/AskOldPeople, etc.)
  - Keyword filtering for regret-related content
  - Top comment extraction
  - JSON data storage

- [x] **Pattern Extraction** (`pattern_extractor.py`)
  - Claude Sonnet 4 integration
  - Structured data extraction from stories
  - Batch processing with rate limiting
  - Category classification (career, relationship, etc.)
  - Severity scoring (1-10)

- [x] **Pattern Matching** (`matcher.py`)
  - Relevance scoring algorithm
  - Age-based matching
  - Category filtering
  - Context similarity analysis
  - Top-N pattern selection

- [x] **Decision Analysis** (`matcher.py`)
  - Claude AI-powered analysis
  - Regret probability calculation (0-100%)
  - Severity prediction
  - Timeline estimation
  - Pros/cons extraction
  - Key insights generation
  - Quote extraction from similar cases
  - Hidden factor detection
  - Personalized recommendations

- [x] **REST API** (`api.py`)
  - POST /api/analyze - Decision analysis endpoint
  - GET /api/patterns - Database statistics
  - GET /api/categories - Category breakdown
  - POST /api/scrape - Admin scraping trigger
  - POST /api/extract - Admin extraction trigger
  - GET /api/health - Health check
  - CORS enabled for frontend integration

#### Frontend
- [x] **Landing Page** (`App.jsx`)
  - Hero section with gradient design
  - Feature cards with icons
  - "How It Works" section
  - Smooth animations
  - Responsive layout

- [x] **Questionnaire Form** (`QuestionnaireForm.jsx`)
  - Age input
  - Decision category selector
  - Situation description (textarea)
  - Decision description (textarea)
  - Multiple options (2-3 inputs)
  - Life goals/values (textarea)
  - Timeline selector
  - Form validation
  - Loading states
  - Error handling
  - Privacy notice

- [x] **Results Display** (`RegretAnalysis.jsx`)
  - Regret probability visualization
  - Color-coded risk levels (green/yellow/red)
  - Severity bars (1-10 scale)
  - Timeline information
  - Similar situations count
  - Pros and cons lists
  - Key insights cards
  - Real quotes (expandable)
  - Hidden factors alert
  - Overall insights section
  - Recommendation card with confidence score
  - Smooth animations

- [x] **Data Visualization** (`PatternVisualization.jsx`)
  - Pie chart - Category distribution
  - Bar chart - Severity distribution
  - Bar chart - Age distribution
  - Stat cards with icons
  - Responsive charts (Recharts)
  - Loading states

- [x] **UI/UX Design**
  - Tailwind CSS integration
  - Custom color palette (purple/pink gradients)
  - Google Fonts (Inter, Outfit)
  - Glassmorphism effects
  - Smooth transitions
  - Hover effects
  - Custom scrollbar
  - Loading spinner
  - Mobile responsive
  - Accessibility considerations

#### Data
- [x] **Sample Database**
  - 25 curated regret patterns
  - All 6 categories covered
  - Realistic scenarios
  - Varied age ranges
  - Different severity levels
  - Ready for immediate testing

#### Documentation
- [x] **README.md** - Comprehensive documentation
- [x] **QUICKSTART.md** - 5-minute setup guide
- [x] **setup.bat** - Automated setup script
- [x] **.env.example** - Environment template
- [x] **Code comments** - Inline documentation

## 🎨 Design Philosophy

### Emotion-Focused Design
- **Warm color palette**: Purple and pink gradients evoke empathy
- **Smooth animations**: Reduce anxiety, increase engagement
- **Clear typography**: Easy to read, professional
- **Generous whitespace**: Reduces cognitive load
- **Empathetic copy**: Supportive, non-judgmental tone

### Data-Driven Insights
- **Quantitative metrics**: Percentages, scores, counts
- **Visual representations**: Charts, progress bars, color coding
- **Real examples**: Direct quotes from similar situations
- **Transparent reasoning**: Explain AI decisions

### User Experience
- **Conversational flow**: Natural question progression
- **Progressive disclosure**: Show details on demand
- **Instant feedback**: Loading states, error messages
- **Mobile-first**: Responsive on all devices

## 🏗️ Technical Architecture

### Technology Stack
- **Backend**: Python 3.8+, Flask, PRAW, Anthropic SDK
- **Frontend**: React 18, Vite, Tailwind CSS, Recharts
- **AI**: Claude Sonnet 4 (Anthropic)
- **Data**: JSON file storage (SQLite-ready)
- **API**: RESTful architecture

### Data Flow
1. **User Input** → Questionnaire Form
2. **API Request** → POST /api/analyze
3. **Pattern Matching** → Find relevant stories
4. **AI Analysis** → Claude processes patterns + user input
5. **Response** → Structured JSON with predictions
6. **Visualization** → React components render results

### Pattern Matching Algorithm
1. **Age similarity**: ±10 years weighted scoring
2. **Category match**: Exact category bonus
3. **Context similarity**: Keyword overlap
4. **Severity weighting**: Higher severity = more relevant
5. **Top-N selection**: Best 10-20 matches sent to AI

## 📊 Sample Data Structure

### Pattern Object
```json
{
  "age_when_decided": 25,
  "age_when_regret_felt": 30,
  "decision_made": "Specific decision",
  "situation_context": "Circumstances",
  "regret_severity": 7,
  "regret_reason": "Why they regret it",
  "pattern_tags": ["tag1", "tag2"],
  "decision_category": "career",
  "source_post_id": "reddit_id",
  "source_subreddit": "regret",
  "original_score": 1250
}
```

### Analysis Response
```json
{
  "options_analysis": [
    {
      "option": "Option name",
      "regret_probability": 45,
      "regret_severity": 6,
      "timeline": "2-5 years",
      "similar_situations_count": 12,
      "key_insights": ["insight1", "insight2"],
      "quotes_examples": ["quote1", "quote2"],
      "pros": ["pro1", "pro2"],
      "cons": ["con1", "con2"]
    }
  ],
  "recommendation": {
    "suggested_option": "Option 2",
    "reasoning": "Detailed explanation",
    "confidence": 75
  },
  "hidden_factors": ["factor1", "factor2"],
  "overall_insights": ["insight1", "insight2"]
}
```

## 🚀 Future Enhancements

### Phase 2 Features
- [ ] User accounts and authentication
- [ ] Save and track decisions over time
- [ ] Email reminders to check back on decisions
- [ ] Community features (share anonymously)
- [ ] More data sources (Twitter, forums, surveys)
- [ ] Advanced filtering (by demographics, location)
- [ ] Comparison mode (side-by-side options)
- [ ] PDF report generation

### Phase 3 Features
- [ ] Mobile app (React Native)
- [ ] Real-time collaboration (family decisions)
- [ ] Expert consultation marketplace
- [ ] Machine learning for better matching
- [ ] Sentiment analysis on patterns
- [ ] Predictive modeling improvements
- [ ] Integration with calendar/task apps
- [ ] Gamification elements

### Technical Improvements
- [ ] PostgreSQL database
- [ ] Redis caching
- [ ] Elasticsearch for better search
- [ ] GraphQL API
- [ ] Automated testing (Jest, Pytest)
- [ ] CI/CD pipeline
- [ ] Docker containerization
- [ ] Kubernetes deployment
- [ ] Monitoring and analytics
- [ ] A/B testing framework

## 💡 Use Cases

### Personal Decisions
- Career changes (job offers, entrepreneurship)
- Relationship choices (marriage, breakups)
- Education (college, grad school, bootcamps)
- Financial (investments, major purchases)
- Lifestyle (relocation, lifestyle changes)
- Health (medical decisions, fitness)

### Business Applications
- HR decision support
- Career counseling services
- Financial advisory tools
- Life coaching platforms
- Educational guidance
- Therapy and mental health support

## 📈 Success Metrics

### User Engagement
- Decision analysis completion rate
- Time spent on results page
- Return user rate
- Sharing/referral rate

### Quality Metrics
- User satisfaction ratings
- Recommendation accuracy
- Pattern database growth
- AI response quality

### Business Metrics
- User acquisition cost
- Conversion rate (free → paid)
- Monthly active users
- Revenue per user

## 🔒 Privacy & Ethics

### Data Privacy
- No permanent storage of user decisions (MVP)
- Anonymous pattern extraction
- GDPR compliance ready
- Clear privacy policy

### Ethical Considerations
- Disclaimer: AI assistance, not replacement for professional advice
- Transparency about data sources
- Bias detection and mitigation
- Responsible AI usage

## 🎓 Learning Outcomes

This project demonstrates:
- **Full-stack development**: Python backend + React frontend
- **AI integration**: Claude API for NLP tasks
- **Data engineering**: Scraping, extraction, storage
- **API design**: RESTful architecture
- **UI/UX design**: Modern, responsive interfaces
- **Product thinking**: MVP prioritization
- **Documentation**: Comprehensive guides

## 📞 Support & Community

- **GitHub Issues**: Bug reports and feature requests
- **Documentation**: README and QUICKSTART guides
- **Code Comments**: Inline explanations
- **Example Data**: 25 sample patterns included

---

**Built with ❤️ to help people make better decisions and live with fewer regrets.**
