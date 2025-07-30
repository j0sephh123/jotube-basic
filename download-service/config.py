# download-service/config.py
import os

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    # Fallback if dotenv not installed
    def load_dotenv():
        pass

# API settings
origins = [
    "http://localhost",
    "http://localhost:5173",
    "http://localhost:5174",
]

# YouTube settings
base = 'https://www.youtube.com/watch?v='

# File storage settings
yt_dir = os.getenv('YOUTUBE_DIR')

# Video quality settings
video_formats = 'bestvideo[ext=mp4][vcodec^=avc1]/bestvideo/best'

# Server configuration
port = int(os.getenv('PORT', 8081))