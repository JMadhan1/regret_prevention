import praw
import json
import os
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

class RedditScraper:
    def __init__(self):
        """Initialize Reddit API client"""
        self.reddit = praw.Reddit(
            client_id=os.getenv('REDDIT_CLIENT_ID'),
            client_secret=os.getenv('REDDIT_CLIENT_SECRET'),
            user_agent=os.getenv('REDDIT_USER_AGENT', 'RegretPreventionEngine/1.0')
        )
        
        self.target_subreddits = [
            'regret',
            'AskOldPeople',
            'careerguidance',
            'relationships',
            'LifeProTips',
            'DecidingToBeBetter'
        ]
        
        self.keywords = [
            'regret',
            'wish I had',
            'biggest mistake',
            'if I could go back',
            'should have',
            'shouldnt have',
            'looking back',
            'hindsight'
        ]
    
    def scrape_subreddit(self, subreddit_name, limit=500):
        """Scrape posts from a specific subreddit"""
        print(f"Scraping r/{subreddit_name}...")
        
        try:
            subreddit = self.reddit.subreddit(subreddit_name)
            posts = []
            
            # Get top posts of all time
            for post in subreddit.top(time_filter='all', limit=limit):
                # Check if post contains regret-related keywords
                text = f"{post.title} {post.selftext}".lower()
                if any(keyword in text for keyword in self.keywords):
                    # Get top comments
                    post.comments.replace_more(limit=0)
                    top_comments = []
                    for comment in post.comments[:5]:  # Get top 5 comments
                        if hasattr(comment, 'body'):
                            top_comments.append({
                                'body': comment.body,
                                'score': comment.score
                            })
                    
                    posts.append({
                        'id': post.id,
                        'subreddit': subreddit_name,
                        'title': post.title,
                        'body': post.selftext,
                        'score': post.score,
                        'created_utc': post.created_utc,
                        'num_comments': post.num_comments,
                        'url': post.url,
                        'top_comments': top_comments
                    })
            
            print(f"Found {len(posts)} relevant posts in r/{subreddit_name}")
            return posts
            
        except Exception as e:
            print(f"Error scraping r/{subreddit_name}: {str(e)}")
            return []
    
    def scrape_all(self, posts_per_subreddit=500):
        """Scrape all target subreddits"""
        all_posts = []
        
        for subreddit in self.target_subreddits:
            posts = self.scrape_subreddit(subreddit, posts_per_subreddit)
            all_posts.extend(posts)
        
        return all_posts
    
    def save_to_file(self, posts, filename='../data/raw_regret_stories.json'):
        """Save scraped posts to JSON file"""
        os.makedirs(os.path.dirname(filename), exist_ok=True)
        
        data = {
            'scraped_at': datetime.now().isoformat(),
            'total_posts': len(posts),
            'posts': posts
        }
        
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        
        print(f"Saved {len(posts)} posts to {filename}")
        return filename

if __name__ == '__main__':
    scraper = RedditScraper()
    posts = scraper.scrape_all(posts_per_subreddit=100)  # Start with 100 per subreddit for testing
    scraper.save_to_file(posts)
