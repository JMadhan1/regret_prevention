# Troubleshooting Guide

## Common Issues and Solutions

### Backend Issues

#### ❌ "Module not found" errors
**Problem**: Python dependencies not installed

**Solution**:
```bash
cd backend
venv\Scripts\activate
pip install -r requirements.txt
```

#### ❌ "ANTHROPIC_API_KEY not found"
**Problem**: Environment variable not set

**Solution**:
1. Copy `.env.example` to `.env`
2. Edit `.env` and add your API key:
   ```
   ANTHROPIC_API_KEY=sk-ant-your-key-here
   ```
3. Restart the backend server

#### ❌ "Pattern database not initialized"
**Problem**: Missing or invalid patterns file

**Solution**:
- Check that `data/regret_patterns.json` exists
- Verify it's valid JSON (open in text editor)
- If missing, the sample data should be there by default

#### ❌ Port 5000 already in use
**Problem**: Another application using port 5000

**Solution**:
```bash
# Option 1: Kill the process using port 5000
netstat -ano | findstr :5000
taskkill /PID <process_id> /F

# Option 2: Change port in backend/.env
FLASK_PORT=5001
```

#### ❌ "Invalid API key" from Claude
**Problem**: Incorrect or expired API key

**Solution**:
1. Verify your API key at https://console.anthropic.com/
2. Make sure there are no extra spaces in `.env`
3. Check your API key has credits/quota

### Frontend Issues

#### ❌ "npm install" fails
**Problem**: Node.js version too old or corrupted packages

**Solution**:
```bash
# Check Node version (need 16+)
node --version

# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rmdir /s /q node_modules
npm install
```

#### ❌ "Cannot find module" errors
**Problem**: Dependencies not installed

**Solution**:
```bash
cd frontend
npm install
```

#### ❌ Blank page or white screen
**Problem**: JavaScript error or API connection issue

**Solution**:
1. Open browser console (F12)
2. Check for error messages
3. Verify backend is running on port 5000
4. Check CORS settings in backend/api.py

#### ❌ API calls return 404
**Problem**: Backend not running or wrong URL

**Solution**:
1. Make sure backend is running: `http://localhost:5000/api/health`
2. Check Vite proxy config in `vite.config.js`
3. Verify API endpoints in component files

#### ❌ Tailwind styles not working
**Problem**: PostCSS or Tailwind not configured

**Solution**:
```bash
# Reinstall Tailwind
npm install -D tailwindcss postcss autoprefixer

# Restart dev server
npm run dev
```

### Data Issues

#### ❌ "No patterns found" in analysis
**Problem**: Pattern database empty or not loaded

**Solution**:
1. Check `data/regret_patterns.json` exists and has data
2. Restart backend server
3. Check backend console for loading messages

#### ❌ Analysis returns generic results
**Problem**: Not enough relevant patterns

**Solution**:
1. Try different decision categories
2. Add more patterns to database
3. Run Reddit scraper to collect more data

### API Issues

#### ❌ "Rate limit exceeded" from Claude
**Problem**: Too many API calls

**Solution**:
1. Wait a few minutes
2. Reduce batch size in pattern_extractor.py
3. Check your API quota at Anthropic console

#### ❌ "Connection timeout" errors
**Problem**: Network issues or API down

**Solution**:
1. Check internet connection
2. Verify Anthropic API status
3. Increase timeout in requests

#### ❌ Reddit scraping fails
**Problem**: Invalid Reddit credentials or rate limiting

**Solution**:
1. Verify Reddit API credentials in `.env`
2. Check app settings at https://www.reddit.com/prefs/apps
3. Reddit API has rate limits - be patient
4. Use sample data instead for testing

### Development Issues

#### ❌ Changes not reflecting
**Problem**: Cache or build issues

**Solution**:
```bash
# Frontend: Hard refresh
Ctrl + Shift + R (or Cmd + Shift + R on Mac)

# Backend: Restart server
Ctrl + C, then python api.py

# Clear browser cache
F12 → Network tab → Disable cache
```

#### ❌ Virtual environment not activating
**Problem**: Path issues or permissions

**Solution**:
```bash
# Windows
cd backend
venv\Scripts\activate

# If that fails, try:
python -m venv venv --clear
venv\Scripts\activate
```

#### ❌ Git issues with large files
**Problem**: Accidentally committed node_modules or data

**Solution**:
```bash
# Make sure .gitignore is set up
git rm -r --cached node_modules
git rm -r --cached data/raw_regret_stories.json
git commit -m "Remove large files"
```

### Performance Issues

#### ❌ Slow API responses
**Problem**: Large pattern database or complex analysis

**Solution**:
1. Reduce pattern database size for testing
2. Limit patterns sent to Claude (adjust in matcher.py)
3. Use caching for repeated queries

#### ❌ Frontend lag or stuttering
**Problem**: Too many re-renders or heavy components

**Solution**:
1. Check browser console for warnings
2. Reduce chart data points
3. Optimize component re-renders with React.memo

### Deployment Issues

#### ❌ Build fails
**Problem**: Missing dependencies or environment variables

**Solution**:
```bash
# Frontend
cd frontend
npm run build

# Check for errors
# Make sure all dependencies are in package.json
```

#### ❌ Production API calls fail
**Problem**: CORS or wrong API URL

**Solution**:
1. Update API URL in production build
2. Configure CORS for production domain
3. Check environment variables on hosting platform

## Getting Help

### Before Asking for Help

1. **Check the console**: Browser console (F12) and terminal output
2. **Read error messages**: They usually tell you what's wrong
3. **Verify setup**: Follow QUICKSTART.md step by step
4. **Check documentation**: README.md has detailed info

### Debugging Tips

1. **Test backend independently**:
   ```bash
   curl http://localhost:5000/api/health
   ```

2. **Test frontend independently**:
   - Check if page loads without API calls
   - Use browser DevTools Network tab

3. **Isolate the issue**:
   - Does it work with sample data?
   - Does it work in a different browser?
   - Does it work on a different machine?

### Useful Commands

```bash
# Check if backend is running
curl http://localhost:5000/api/health

# Check if frontend is running
curl http://localhost:3000

# View backend logs
cd backend
python api.py  # Watch console output

# View frontend logs
cd frontend
npm run dev  # Watch console output

# Test API endpoint
curl -X POST http://localhost:5000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"age": 25, "situation": "test", "decision_description": "test", "options": ["a", "b"]}'
```

### Environment Checklist

- [ ] Python 3.8+ installed
- [ ] Node.js 16+ installed
- [ ] Virtual environment activated
- [ ] All Python dependencies installed
- [ ] All npm dependencies installed
- [ ] .env file created with ANTHROPIC_API_KEY
- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] data/regret_patterns.json exists
- [ ] Browser console shows no errors

## Still Having Issues?

1. **Start fresh**:
   ```bash
   # Delete everything and re-clone
   # Or re-run setup.bat
   ```

2. **Check versions**:
   ```bash
   python --version  # Should be 3.8+
   node --version    # Should be 16+
   npm --version
   ```

3. **Review logs**: Check both backend terminal and browser console

4. **Simplify**: Test with minimal example first

---

**Most issues are solved by:**
1. Restarting servers
2. Reinstalling dependencies
3. Checking environment variables
4. Reading error messages carefully
