import json
import os
from gemini_client import GeminiClient
from dotenv import load_dotenv
import time

load_dotenv()

class PatternExtractor:
    def __init__(self):
        """Initialize Gemini API client"""
        self.client = GeminiClient()

    
    def extract_pattern(self, post):
        """Extract structured pattern from a single post using Gemini"""
        
        # Combine title, body, and top comments
        story_text = f"Title: {post['title']}\n\n"
        if post.get('body'):
            story_text += f"Story: {post['body']}\n\n"
        
        if post.get('top_comments'):
            story_text += "Top Comments:\n"
            for comment in post['top_comments'][:3]:
                story_text += f"- {comment['body']}\n"
        
        prompt = f"""Analyze this regret story and extract structured data:

Story: {story_text}

Extract and return ONLY a valid JSON object with this exact structure:
{{
  "age_when_decided": <number or null>,
  "age_when_regret_felt": <number or null>,
  "decision_made": "<specific decision>",
  "situation_context": "<circumstances around decision>",
  "regret_severity": <1-10>,
  "regret_reason": "<why they regret it>",
  "pattern_tags": ["<tag1>", "<tag2>"],
  "decision_category": "<career/relationship/education/financial/health/lifestyle>"
}}

Be specific and extract actual details from the story. If information is not available, use null for numbers and empty strings for text."""

        try:
            response_text = self.client.generate_content(prompt)

            
            # Try to parse JSON
            try:
                pattern_data = json.loads(response_text)
            except json.JSONDecodeError:
                # Try to extract JSON from markdown code blocks
                if "```json" in response_text:
                    json_str = response_text.split("```json")[1].split("```")[0].strip()
                    pattern_data = json.loads(json_str)
                elif "```" in response_text:
                    json_str = response_text.split("```")[1].split("```")[0].strip()
                    pattern_data = json.loads(json_str)
                else:
                    raise
            
            # Add metadata
            pattern_data['source_post_id'] = post['id']
            pattern_data['source_subreddit'] = post['subreddit']
            pattern_data['original_score'] = post['score']
            
            return pattern_data
            
        except Exception as e:
            print(f"Error extracting pattern from post {post['id']}: {str(e)}")
            return None
    
    def extract_patterns_batch(self, posts, batch_size=10, delay=1):
        """Extract patterns from multiple posts with rate limiting"""
        patterns = []
        total = len(posts)
        
        for i, post in enumerate(posts):
            print(f"Processing post {i+1}/{total}...")
            
            pattern = self.extract_pattern(post)
            if pattern:
                patterns.append(pattern)
            
            # Rate limiting
            if (i + 1) % batch_size == 0:
                print(f"Processed {i+1} posts, waiting {delay}s...")
                time.sleep(delay)
        
        return patterns
    
    def save_patterns(self, patterns, filename='../data/regret_patterns.json'):
        """Save extracted patterns to JSON file"""
        os.makedirs(os.path.dirname(filename), exist_ok=True)
        
        data = {
            'extracted_at': time.strftime('%Y-%m-%d %H:%M:%S'),
            'total_patterns': len(patterns),
            'patterns': patterns
        }
        
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        
        print(f"Saved {len(patterns)} patterns to {filename}")
        return filename

if __name__ == '__main__':
    # Load raw stories
    with open('../data/raw_regret_stories.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    extractor = PatternExtractor()
    
    # Process first 50 posts for testing
    patterns = extractor.extract_patterns_batch(data['posts'][:50])
    extractor.save_patterns(patterns)

