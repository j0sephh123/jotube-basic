# download-service/orchestrator.py
import asyncio
from typing import Dict, Any

async def process_queue(queue, downloader):
    """
    Process the download queue
    
    Args:
        queue: The DownloadQueue instance
        downloader: The VideoDownloader instance
    """
    while True:
        task = await queue.get_next_task()
        await process_task(task, queue, downloader)
        queue.task_done()

async def process_task(task: Dict[str, Any], queue, downloader):
    """
    Process a single download task
    
    Args:
        task: The task dictionary
        queue: The DownloadQueue instance
        downloader: The VideoDownloader instance
    """
    video_id = task["ytVideoId"]
    channel_id = task["ytChannelId"]
    custom_path = task.get("customPath")
    
    print(f"Processing download task: {video_id}")

    try:
        if task["status"] == "pending":
            # Check if already downloaded
            local_path = downloader.check_if_downloaded(video_id, channel_id, custom_path)
            
            if not local_path:
                # Set status to downloading
                queue.update_task_status(video_id, "downloading")
                
                # Download using thread to not block the event loop
                download_success = await asyncio.to_thread(
                    downloader.download_video, 
                    video_id, 
                    channel_id,
                    custom_path
                )
                
                if not download_success:
                    raise Exception("Download failed")
            else:
                print(f"Video '{video_id}' already exists at {local_path}. Skipping download.")
        
        # Mark as completed
        queue.update_task_status(video_id, "completed")
        
    except Exception as e:
        print(f"Error processing task: {e}")
        queue.update_task_status(video_id, "failed")
    finally:
        # Remove task from queue
        queue.remove_task(video_id)