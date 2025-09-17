import { Resolver, Query, Args } from '@nestjs/graphql';
import { ScreenshotsApiService } from './api/screenshots-api.service';
import { GetScreenshotsInput } from 'src/thumbnails/dtos/get-screenshots.input';
import { GetScreenshotsResponse } from 'src/thumbnails/dtos/get-screenshots.response';

@Resolver()
export class ScreenshotsResolver {
  constructor(private readonly screenshotsApiService: ScreenshotsApiService) {}

  @Query(() => [GetScreenshotsResponse])
  async getScreenshots(
    @Args('input') input: GetScreenshotsInput,
  ): Promise<GetScreenshotsResponse[]> {
    console.log({ where: 'getScreenshots', input });
    return this.screenshotsApiService.getScreenshots(input);
  }
}
