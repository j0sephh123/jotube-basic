import { Resolver, Query, Args } from '@nestjs/graphql';
import { ThumbnailsApiService } from './api/thumbnails-api.service';
import { UploadsWithThumbnailsInput } from './dtos/uploads-with-thumbnails.input';
import { UploadsWithThumbnailsResponse } from './dtos/uploads-with-thumbnails.response';
import { GetSlidesInput } from './dtos/get-slides.input';
import { GetSlidesResponse } from './dtos/get-slides.response';

@Resolver()
export class ThumbnailsResolver {
  constructor(private readonly thumbnailsApiService: ThumbnailsApiService) {}

  @Query(() => [GetSlidesResponse])
  async getSlides(
    @Args('input') input: GetSlidesInput,
  ): Promise<GetSlidesResponse[]> {
    return this.thumbnailsApiService.getSlides(input.ytChannelIds || []);
  }

  @Query(() => [UploadsWithThumbnailsResponse])
  async uploadsWithThumbnails(
    @Args('input') input: UploadsWithThumbnailsInput,
  ): Promise<UploadsWithThumbnailsResponse[]> {
    return this.thumbnailsApiService.uploadsWithThumbnails(input.channelIds);
  }
}
