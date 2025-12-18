import json
import os
from gemini_client import GeminiClient
from dotenv import load_dotenv

load_dotenv()

class RegretMatcher:
    def __init__(self, patterns_file='../data/regret_patterns.json'):
        """Initialize matcher with pattern database"""
        self.client = GeminiClient()

        
        # Load patterns
        with open(patterns_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
            self.patterns = data['patterns']
        
        print(f"Loaded {len(self.patterns)} patterns")
    
    def find_relevant_patterns(self, user_age, decision_category, situation_context, limit=20):
        """Find most relevant patterns based on user input"""
        relevant = []
        
        for pattern in self.patterns:
            score = 0
            
            # Age similarity (within 10 years)
            if pattern.get('age_when_decided'):
                age_diff = abs(pattern['age_when_decided'] - user_age)
                if age_diff <= 10:
                    score += (10 - age_diff) * 2
            
            # Category match
            if pattern.get('decision_category') == decision_category:
                score += 20
            
            # Context similarity (simple keyword matching)
            if situation_context:
                context_lower = situation_context.lower()
                pattern_context = pattern.get('situation_context', '').lower()
                common_words = set(context_lower.split()) & set(pattern_context.split())
                score += len(common_words)
            
            # Higher severity patterns are more relevant
            if pattern.get('regret_severity'):
                score += pattern['regret_severity']
            
            if score > 0:
                relevant.append({
                    'pattern': pattern,
                    'relevance_score': score
                })
        
        # Sort by relevance and return top matches
        relevant.sort(key=lambda x: x['relevance_score'], reverse=True)
        return [r['pattern'] for r in relevant[:limit]]
    
    def analyze_decision(self, user_input):
        """Analyze user's decision using Gemini and pattern database"""
        
        # Find relevant patterns
        relevant_patterns = self.find_relevant_patterns(
            user_input['age'],
            user_input.get('category', 'lifestyle'),
            user_input['situation']
        )
        
        # Prepare patterns summary for Gemini
        patterns_summary = []
        for i, pattern in enumerate(relevant_patterns[:10], 1):
            patterns_summary.append({
                'id': i,
                'decision': pattern.get('decision_made', 'N/A'),
                'context': pattern.get('situation_context', 'N/A'),
                'severity': pattern.get('regret_severity', 'N/A'),
                'reason': pattern.get('regret_reason', 'N/A'),
                'age_decided': pattern.get('age_when_decided', 'N/A'),
                'category': pattern.get('decision_category', 'N/A')
            })
        
        prompt = f"""User Situation:
Age: {user_input['age']}
Context: {user_input['situation']}
Decision: {user_input['decision_description']}
Options: {', '.join(user_input['options'])}
Goals/Values: {user_input.get('goals', 'Not specified')}
Timeline: {user_input.get('timeline', 'Not specified')}

Regret Pattern Database (similar situations):
{json.dumps(patterns_summary, indent=2)}

Analyze this situation and provide a comprehensive regret analysis. For each option the user is considering:

1. Calculate regret probability (0-100%) based on similar patterns
2. Identify regret severity (1-10) and typical timeline (when regret emerges)
3. Extract 3-5 key insights from similar stories
4. Find 2-3 direct quotes or examples from people who made similar choices
5. Detect any hidden high-stakes factors they might be overlooking
6. Provide specific recommendation with reasoning

Return your analysis as a JSON object with this structure:
{{
  "options_analysis": [
    {{
      "option": "<option name>",
      "regret_probability": <0-100>,
      "regret_severity": <1-10>,
      "timeline": "<when regret typically emerges>",
      "similar_situations_count": <number>,
      "key_insights": ["<insight1>", "<insight2>", ...],
      "quotes_examples": ["<quote1>", "<quote2>", ...],
      "pros": ["<pro1>", "<pro2>", ...],
      "cons": ["<con1>", "<con2>", ...]
    }}
  ],
  "hidden_factors": ["<factor1>", "<factor2>", ...],
  "recommendation": {{
    "suggested_option": "<option name>",
    "reasoning": "<detailed reasoning>",
    "confidence": <0-100>
  }},
  "overall_insights": ["<insight1>", "<insight2>", ...]
}}

Be quantitative where possible. Make it emotionally resonant but data-driven."""

        try:
            response_text = self.client.generate_content(prompt)

            
            # Parse JSON response
            try:
                analysis = json.loads(response_text)
            except json.JSONDecodeError:
                # Try to extract JSON from markdown code blocks
                if "```json" in response_text:
                    json_str = response_text.split("```json")[1].split("```")[0].strip()
                    analysis = json.loads(json_str)
                elif "```" in response_text:
                    json_str = response_text.split("```")[1].split("```")[0].strip()
                    analysis = json.loads(json_str)
                else:
                    raise
            
            # Add metadata
            analysis['patterns_analyzed'] = len(relevant_patterns)
            analysis['user_input'] = user_input
            
            return analysis
            
        except Exception as e:
            print(f"Error analyzing decision: {str(e)}")
            return {
                'error': str(e),
                'options_analysis': [],
                'recommendation': None
            }

if __name__ == '__main__':
    # Test the matcher
    matcher = RegretMatcher()
    
    test_input = {
        'age': 25,
        'situation': 'I have a stable job but I want to start my own business',
        'decision_description': 'Should I quit my job to pursue entrepreneurship?',
        'options': ['Stay in current job', 'Quit and start business', 'Start business part-time'],
        'goals': 'Financial independence and creative fulfillment',
        'timeline': '3 months',
        'category': 'career'
    }
    
    result = matcher.analyze_decision(test_input)
    print(json.dumps(result, indent=2))

