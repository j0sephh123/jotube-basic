import { Resolver, Query, Args } from '@nestjs/graphql';
import { ThumbnailsApiService } from './api/thumbnails-api.service';
import { UploadsWithThumbnailsInput } from './dtos/uploads-with-thumbnails.input';
import { UploadsWithThumbnailsResponse } from './dtos/uploads-with-thumbnails.response';

@Resolver()
export class ThumbnailsResolver {
  constructor(private readonly thumbnailsApiService: ThumbnailsApiService) {}

  @Query(() => [UploadsWithThumbnailsResponse])
  async uploadsWithThumbnails(
    @Args('input') input: UploadsWithThumbnailsInput,
  ): Promise<UploadsWithThumbnailsResponse[]> {
    return this.thumbnailsApiService.uploadsWithThumbnails(input.channelIds);
  }
}
