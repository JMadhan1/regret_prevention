from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
from dotenv import load_dotenv
from matcher import RegretMatcher
from scraper import RedditScraper
from pattern_extractor import PatternExtractor

load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize matcher (will be loaded when patterns exist)
matcher = None

def init_matcher():
    """Initialize matcher if patterns file exists"""
    global matcher
    patterns_file = '../data/regret_patterns.json'
    if os.path.exists(patterns_file):
        try:
            matcher = RegretMatcher(patterns_file)
            print("Matcher initialized successfully")
        except Exception as e:
            print(f"Error initializing matcher: {e}")
    else:
        print(f"Patterns file not found at {patterns_file}")

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'matcher_loaded': matcher is not None
    })

@app.route('/api/analyze', methods=['POST'])
def analyze_decision():
    """Analyze user's decision and return regret predictions"""
    if not matcher:
        return jsonify({
            'error': 'Pattern database not initialized. Please run scraping and extraction first.'
        }), 503
    
    try:
        user_input = request.json
        
        # Validate required fields
        required_fields = ['age', 'situation', 'decision_description', 'options']
        for field in required_fields:
            if field not in user_input:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        # Analyze decision
        analysis = matcher.analyze_decision(user_input)
        
        return jsonify(analysis)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/patterns', methods=['GET'])
def get_patterns_summary():
    """Get summary statistics of pattern database"""
    try:
        patterns_file = '../data/regret_patterns.json'
        if not os.path.exists(patterns_file):
            return jsonify({'error': 'Patterns database not found'}), 404
        
        with open(patterns_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        patterns = data['patterns']
        
        # Calculate statistics
        categories = {}
        severity_distribution = {i: 0 for i in range(1, 11)}
        age_ranges = {'18-25': 0, '26-35': 0, '36-45': 0, '46-55': 0, '56+': 0}
        
        for pattern in patterns:
            # Category distribution
            category = pattern.get('decision_category', 'unknown')
            categories[category] = categories.get(category, 0) + 1
            
            # Severity distribution
            severity = pattern.get('regret_severity')
            if severity and 1 <= severity <= 10:
                severity_distribution[severity] += 1
            
            # Age distribution
            age = pattern.get('age_when_decided')
            if age:
                if age < 26:
                    age_ranges['18-25'] += 1
                elif age < 36:
                    age_ranges['26-35'] += 1
                elif age < 46:
                    age_ranges['36-45'] += 1
                elif age < 56:
                    age_ranges['46-55'] += 1
                else:
                    age_ranges['56+'] += 1
        
        return jsonify({
            'total_patterns': len(patterns),
            'extracted_at': data.get('extracted_at'),
            'categories': categories,
            'severity_distribution': severity_distribution,
            'age_distribution': age_ranges
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/categories', methods=['GET'])
def get_categories():
    """Get regret patterns grouped by category"""
    try:
        patterns_file = '../data/regret_patterns.json'
        if not os.path.exists(patterns_file):
            return jsonify({'error': 'Patterns database not found'}), 404
        
        with open(patterns_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        patterns = data['patterns']
        
        # Group by category
        by_category = {}
        for pattern in patterns:
            category = pattern.get('decision_category', 'unknown')
            if category not in by_category:
                by_category[category] = []
            by_category[category].append(pattern)
        
        return jsonify(by_category)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/scrape', methods=['POST'])
def trigger_scrape():
    """Trigger Reddit scraping (admin endpoint)"""
    try:
        # Get parameters
        posts_per_subreddit = request.json.get('posts_per_subreddit', 100)
        
        # Run scraper
        scraper = RedditScraper()
        posts = scraper.scrape_all(posts_per_subreddit)
        filename = scraper.save_to_file(posts)
        
        return jsonify({
            'success': True,
            'posts_scraped': len(posts),
            'file': filename
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/extract', methods=['POST'])
def trigger_extraction():
    """Trigger pattern extraction (admin endpoint)"""
    try:
        # Load raw stories
        raw_file = '../data/raw_regret_stories.json'
        if not os.path.exists(raw_file):
            return jsonify({'error': 'Raw stories not found. Run scraping first.'}), 404
        
        with open(raw_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # Get parameters
        limit = request.json.get('limit', 50)
        
        # Run extractor
        extractor = PatternExtractor()
        patterns = extractor.extract_patterns_batch(data['posts'][:limit])
        filename = extractor.save_patterns(patterns)
        
        # Reinitialize matcher with new patterns
        init_matcher()
        
        return jsonify({
            'success': True,
            'patterns_extracted': len(patterns),
            'file': filename
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Try to initialize matcher on startup
    init_matcher()
    
    port = int(os.getenv('FLASK_PORT', 5000))
    app.run(debug=True, port=port, host='0.0.0.0')
