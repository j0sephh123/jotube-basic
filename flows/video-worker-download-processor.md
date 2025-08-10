# Video Worker Download Processor Flow

```mermaid
sequenceDiagram
    participant Queue
    participant DownloadProcessor
    participant DownloadService
    participant VideoProcessor

    Queue->>DownloadProcessor: processDownload(job)
    DownloadProcessor->>DownloadService: download(job.data)
    DownloadService-->>DownloadProcessor: Download completed

    DownloadProcessor->>VideoProcessor: add(job.data)
    Note over DownloadProcessor,VideoProcessor: Add job to video processing queue

    DownloadProcessor-->>Queue: Job completed
```
