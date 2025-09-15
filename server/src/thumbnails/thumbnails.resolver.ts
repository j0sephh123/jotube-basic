import { Resolver, Query, Args } from '@nestjs/graphql';
import { ThumbnailsApiService } from './api/thumbnails-api.service';
import { UploadsWithThumbnailsInput } from './dtos/uploads-with-thumbnails.input';
import { UploadsWithThumbnailsResponse } from './dtos/uploads-with-thumbnails.response';
import { GetThumbnailResponse } from './dtos/get-thumbnail.response';
import { GetThumbnailInput } from './dtos/get-thumbnail.input';
import { EpisodesWithThumbnailsInput } from './dtos/episodes-with-thumbnails.input';
import { EpisodesWithThumbnailsResponse } from './dtos/episodes-with-thumbnails.response';
import { BadRequestException } from '@nestjs/common';

@Resolver()
export class ThumbnailsResolver {
  constructor(private readonly thumbnailsApiService: ThumbnailsApiService) {}

  @Query(() => [UploadsWithThumbnailsResponse])
  async uploadsWithThumbnails(
    @Args('input') input: UploadsWithThumbnailsInput,
  ): Promise<UploadsWithThumbnailsResponse[]> {
    return this.thumbnailsApiService.uploadsWithThumbnails(input);
  }

  @Query(() => GetThumbnailResponse, { nullable: true })
  async getThumbnail(
    @Args('input') input: GetThumbnailInput,
  ): Promise<GetThumbnailResponse> {
    if (!input.type) {
      throw new BadRequestException(
        'Type field is required. Possible values: "upload" or "episode"',
      );
    }

    if (input.type !== 'upload' && input.type !== 'episode') {
      throw new BadRequestException(
        `Invalid type "${input.type}". Possible values: "upload" or "episode"`,
      );
    }

    const result = await this.thumbnailsApiService.getThumbnail(
      input.videoId,
      input.type,
    );

    if (!result) return null;

    return result;
  }

  @Query(() => [EpisodesWithThumbnailsResponse])
  async episodesWithThumbnails(
    @Args('input') input: EpisodesWithThumbnailsInput,
  ): Promise<EpisodesWithThumbnailsResponse[]> {
    return this.thumbnailsApiService.episodesWithThumbnails(input.episodeIds);
  }
}
