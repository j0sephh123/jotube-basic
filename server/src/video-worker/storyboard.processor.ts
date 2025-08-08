import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { queueNames } from 'src/shared/constants';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { StoryboardService } from 'src/storyboard/storyboard.service';
import { ArtifactType } from '@prisma/client';
import { EventsService } from 'src/core/events/events.service';

type StoryboardJobData = {
  ytVideoId: string;
};

@Processor(queueNames.storyboard)
export class StoryboardProcessor {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly storyboardService: StoryboardService,
    private readonly eventsService: EventsService,
  ) {}

  @Process()
  async processStoryboard(job: Job<StoryboardJobData>) {
    const upload = await this.prismaService.uploadsVideo.findUnique({
      where: { ytId: job.data.ytVideoId },
    });

    if (!upload) {
      throw new Error('Upload not found');
    }

    await this.storyboardService.create(upload);

    await this.prismaService.uploadsVideo.update({
      where: { id: upload.id },
      data: { artifact: ArtifactType.STORYBOARD },
    });

    this.eventsService.sendEvent(
      'storyboard_created',
      job.data.ytVideoId,
      'Storyboard created',
    );

    return;
  }
}
