# download-service/main.py
import asyncio
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware

from config import origins, port
from queue_manager import download_queue
from downloader import VideoDownloader
from orchestrator import process_queue

app = FastAPI()  

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def update_progress(video_id, progress):
    download_queue.update_task_progress(video_id, progress)

downloader = VideoDownloader(update_progress_callback=update_progress)

@app.on_event("startup")
async def startup_event():
    """Start the queue processor on startup"""
    asyncio.create_task(process_queue(download_queue, downloader))

@app.post("/add-to-queue")
async def add_to_queue(request: Request):
    """Add a video to the download queue"""
    try:
        task = await request.json()
        
        if "ytVideoId" not in task or "ytChannelId" not in task:
            raise HTTPException(status_code=400, detail="Missing required fields")
            
        video_id = task["ytVideoId"]
        channel_id = task["ytChannelId"]
        
        existing_path = downloader.check_if_downloaded(video_id, channel_id)
        if existing_path:
            return {"status": "Already downloaded", "path": existing_path}
            
        success = await download_queue.add_task(task)
        if not success:
            raise HTTPException(status_code=400, detail="Failed to add task or duplicate video ID")
            
        return {"status": "Task added to queue"}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

@app.get("/queue")
async def get_queue():
    """Get the current download queue"""
    return download_queue.get_queue()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)