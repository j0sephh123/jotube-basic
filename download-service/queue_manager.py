# queue_manager.py
import asyncio
from typing import List, Dict, Any, Set

class DownloadQueue:
    def __init__(self):
        self.task_queue = asyncio.Queue()
        self.seen_video_ids: Set[str] = set()
        self.queue_elements: List[Dict[str, Any]] = []
        
    def get_queue(self):
        """Get current queue elements"""
        return self.queue_elements
        
    async def add_task(self, task: Dict[str, Any]):
        """Add a task to the download queue"""
        video_id = task.get("ytVideoId")
        
        if not video_id:
            return False
            
        if video_id in self.seen_video_ids:
            return False
            
        # Initialize task status
        task.update({
            "status": "pending",
            "progress": "0%",
            "totalSeconds": 0
        })
        
        self.seen_video_ids.add(video_id)
        self.queue_elements.append(task)
        await self.task_queue.put(task)
        
        return True
        
    def update_task_progress(self, video_id: str, progress: str):
        """Update progress for a specific task"""
        for task in self.queue_elements:
            if task["ytVideoId"] == video_id:
                task["progress"] = progress
                break
                
    def update_task_status(self, video_id: str, status: str):
        """Update status for a specific task"""
        for task in self.queue_elements:
            if task["ytVideoId"] == video_id:
                task["status"] = status
                break
                
    def remove_task(self, video_id: str):
        """Remove a task from the queue"""
        self.seen_video_ids.discard(video_id)
        self.queue_elements[:] = [t for t in self.queue_elements if t["ytVideoId"] != video_id]
        
    async def get_next_task(self):
        """Get the next task from the queue"""
        return await self.task_queue.get()
        
    def task_done(self):
        """Mark current task as done"""
        self.task_queue.task_done()

# Global queue instance
download_queue = DownloadQueue()