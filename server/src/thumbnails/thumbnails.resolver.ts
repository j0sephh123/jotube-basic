import { Resolver, Query, Args } from '@nestjs/graphql';
import { ThumbnailsApiService } from './api/thumbnails-api.service';
import { UploadsWithThumbnailsInput } from './dtos/uploads-with-thumbnails.input';
import { UploadsWithThumbnailsResponse } from './dtos/uploads-with-thumbnails.response';
import { GetScreenshotsInput } from './dtos/get-screenshots.input';
import { GetScreenshotsResponse } from './dtos/get-screenshots.response';
import { ThumbnailByVideoIdResponse } from './dtos/thumbnail.response';

@Resolver()
export class ThumbnailsResolver {
  constructor(private readonly thumbnailsApiService: ThumbnailsApiService) {}

  @Query(() => [GetScreenshotsResponse])
  async getScreenshots(
    @Args('input') input: GetScreenshotsInput,
  ): Promise<GetScreenshotsResponse[]> {
    return this.thumbnailsApiService.getScreenshots(input.ytChannelIds);
  }

  @Query(() => [UploadsWithThumbnailsResponse])
  async uploadsWithThumbnails(
    @Args('input') input: UploadsWithThumbnailsInput,
  ): Promise<UploadsWithThumbnailsResponse[]> {
    return this.thumbnailsApiService.uploadsWithThumbnails(input.channelIds);
  }

  @Query(() => ThumbnailByVideoIdResponse, { nullable: true })
  async thumbnailByVideoId(
    @Args('ytVideoId') ytVideoId: string,
  ): Promise<ThumbnailByVideoIdResponse | null> {
    const result = await this.thumbnailsApiService.getByYtVideoId(ytVideoId);

    if (!result) return null;

    return {
      ...result,
      createdAt: result.createdAt.toISOString(),
      updatedAt: result.updatedAt.toISOString(),
    };
  }

  @Query(() => [GetScreenshotsResponse])
  async channelScreenshots(
    @Args('ytChannelId') ytChannelId: string,
  ): Promise<GetScreenshotsResponse[]> {
    return this.thumbnailsApiService.getChannelScreenshots(ytChannelId);
  }
}
