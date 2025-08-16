import { Resolver, Query, Args } from '@nestjs/graphql';
import { ScreenshotsApiService } from './api/screenshots-api.service';
import {
  ScreenshotsCountsResponse,
  VideoScreenshotResponse,
} from './dtos/screenshots.response';

@Resolver()
export class ScreenshotsResolver {
  constructor(private readonly screenshotsApiService: ScreenshotsApiService) {}

  @Query(() => [ScreenshotsCountsResponse], { name: 'screenshots' })
  async screenshots(): Promise<ScreenshotsCountsResponse[]> {
    const data = await this.screenshotsApiService.screenshots();
    return Object.entries(data).map(([month, count]) => ({
      month,
      count: count as number,
    }));
  }

  @Query(() => [VideoScreenshotResponse], { name: 'screenshotsByVideo' })
  async screenshotsByVideo(
    @Args('ytVideoId') ytVideoId: string,
  ): Promise<VideoScreenshotResponse[]> {
    return this.screenshotsApiService.getScreenshotsByVideo(ytVideoId);
  }
}
