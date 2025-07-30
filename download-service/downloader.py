# download-service/downloader.py
import os
import yt_dlp
from config import yt_dir, base, video_formats

class VideoDownloader:
    def __init__(self, update_progress_callback=None):
        """
        Initialize the downloader with optional progress callback
        
        Args:
            update_progress_callback: Function to call with progress updates
        """
        self.update_progress_callback = update_progress_callback
        
    def _progress_hook(self, d):
        """Handle download progress updates"""
        if d["status"] == "downloading":
            percent_str = d.get("_percent_str", "0%").strip().replace("\u001b[0;94m", "").replace("\u001b[0m", "").strip()
            print(f"Downloading {d['filename']}: {percent_str}")
            
            if self.update_progress_callback:
                self.update_progress_callback(d['info_dict']['id'], percent_str)
                
    def get_save_path(self, video_id, channel_id=None, custom_path=None):
        """
        Determine where to save the video
        
        Args:
            video_id: YouTube video ID
            channel_id: Optional channel ID for organization
            custom_path: Optional custom save path
            
        Returns:
            Tuple of (directory, output_template)
        """
        if custom_path:
            video_dir = custom_path
        elif channel_id:
            video_dir = os.path.join(yt_dir, channel_id, video_id)
        else:
            video_dir = os.path.join(yt_dir, 'uncategorized', video_id)
            
        os.makedirs(video_dir, exist_ok=True)
        output_template = os.path.join(video_dir, f'{video_id}.%(ext)s')
        
        return video_dir, output_template
    
    def download_video(self, video_id, channel_id=None, custom_path=None, format_spec=None):
        """
        Download a YouTube video
        
        Args:
            video_id: YouTube video ID
            channel_id: Optional channel ID for organization
            custom_path: Optional custom save location
            format_spec: Optional format specification
            
        Returns:
            Boolean indicating success or failure
        """
        _, output_template = self.get_save_path(video_id, channel_id, custom_path)
        
        ydl_opts = {
            'format': format_spec or video_formats,
            'outtmpl': output_template,
            'noplaylist': True,
            'quiet': False,
            'progress_hooks': [self._progress_hook],
            'concurrent_fragment_downloads': 8,
            'cookiesfrombrowser': ('chrome',),
        }

        try:
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                ydl.download([base + video_id])
            return True
        except Exception as e:
            print(f"Error downloading video {video_id}: {e}")
            return False
            
    def check_if_downloaded(self, video_id, channel_id=None, custom_path=None):
        """
        Check if video is already downloaded
        
        Args:
            video_id: YouTube video ID
            channel_id: Optional channel ID
            custom_path: Optional custom path
            
        Returns:
            Path to video file if found, None otherwise
        """
        video_dir, _ = self.get_save_path(video_id, channel_id, custom_path)
        possible_extensions = [".mp4", ".mkv", ".webm"]
        
        for ext in possible_extensions:
            candidate = os.path.join(video_dir, f"{video_id}{ext}")
            if os.path.exists(candidate):
                return candidate
                
        return None