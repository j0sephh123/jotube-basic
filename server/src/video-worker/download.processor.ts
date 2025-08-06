import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Job, Queue } from 'bull';
import { DownloadService } from 'src/core/external-services/youtube-downloader/download.service';
import { queueNames } from 'src/shared/constants';

@Processor(queueNames.download)
export class DownloadProcessor {
  constructor(
    private readonly downloadService: DownloadService,
    @InjectQueue(queueNames.video) private readonly videoProcessor: Queue,
  ) {}

  @Process()
  async processDownload(job: Job) {
    await this.downloadService.download(job.data);
    this.videoProcessor.add(job.data);
    return;
  }
}
