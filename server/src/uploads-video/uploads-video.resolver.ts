import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UploadsVideoService } from './uploads-video.service';
import { DeleteUploadsResponse } from './dtos/delete-uploads.response';
import { FinishProcessUploadResponse } from './dtos/finish-process-upload.response';
import { SaveUploadResponse } from './dtos/save-upload.response';
import { SaveUploadInput } from './dtos/save-upload.input';
import { FetchUploadsResponse } from './dtos/fetch-uploads.response';
import { FetchUploadsInput } from './dtos/fetch-uploads.input';
import { SyncUploadsResponse } from './dtos/sync-uploads.response';
import { SyncUploadsInput } from './dtos/sync-uploads.input';
import { CleanShortUploadsResponse } from './dtos/clean-short-uploads.response';
import { CleanShortUploadsInput } from './dtos/clean-short-uploads.input';
import { UploadsListResponse } from './dtos/uploads-list.response';
import { UploadsListInput } from './dtos/uploads-list.input';
import { UploadsVideoStoryboardResponse } from './dtos/storyboards.response';
import { GetVideoByYtIdInput } from './dtos/get-video-by-ytid.input';
import { VideoByYtIdResponse } from './dtos/get-video-by-ytid.response';

@Resolver()
export class UploadsVideoResolver {
  constructor(private readonly uploadsVideoService: UploadsVideoService) {}

  @Query(() => UploadsListResponse)
  uploadsList(
    @Args('uploadsListInput') uploadsListInput: UploadsListInput,
  ): Promise<UploadsListResponse> {
    try {
      return this.uploadsVideoService.uploadsList(uploadsListInput);
    } catch {
      throw new Error('Failed to fetch uploads');
    }
  }

  @Mutation(() => SaveUploadResponse)
  async saveUpload(
    @Args('saveUploadInput') saveUploadInput: SaveUploadInput,
  ): Promise<SaveUploadResponse> {
    try {
      await this.uploadsVideoService.saveUpload(saveUploadInput);
      return { success: true, message: 'Uploads saved successfully' };
    } catch {
      return { success: false, message: 'Failed to save uploads' };
    }
  }

  @Mutation(() => FetchUploadsResponse)
  async fetchUploads(
    @Args('fetchUploadsInput') fetchUploadsInput: FetchUploadsInput,
  ): Promise<FetchUploadsResponse> {
    try {
      const result =
        await this.uploadsVideoService.fetchUploads(fetchUploadsInput);
      return {
        success: true,
        message: `Successfully fetched ${result.count} uploads`,
        uploadIds: [],
      };
    } catch {
      return {
        success: false,
        message: 'Failed to fetch uploads',
        uploadIds: [],
      };
    }
  }

  @Mutation(() => SyncUploadsResponse)
  async syncUploads(
    @Args('syncUploadsInput') syncUploadsInput: SyncUploadsInput,
  ): Promise<SyncUploadsResponse> {
    try {
      return this.uploadsVideoService.syncUploads(syncUploadsInput);
    } catch {
      return { count: 0 };
    }
  }

  @Mutation(() => CleanShortUploadsResponse)
  async cleanShortUploads(
    @Args('cleanShortUploadsInput')
    cleanShortUploadsInput: CleanShortUploadsInput,
  ): Promise<CleanShortUploadsResponse> {
    try {
      const result = await this.uploadsVideoService.cleanShortUploads(
        cleanShortUploadsInput,
      );
      return result;
    } catch {
      return { deletedCount: 0 };
    }
  }

  @Mutation(() => DeleteUploadsResponse)
  async deleteUploads(
    @Args('ytChannelId') ytChannelId: string,
    @Args('ytVideoIds', { type: () => [String] }) ytVideoIds: string[],
  ): Promise<DeleteUploadsResponse> {
    return this.uploadsVideoService.deleteUploads({ ytChannelId, ytVideoIds });
  }

  @Mutation(() => FinishProcessUploadResponse)
  async finishProcessingUpload(
    @Args('ytChannelId') ytChannelId: string,
    @Args('ytVideoId') ytVideoId: string,
    @Args('savedSeconds', { type: () => [Number] }) savedSeconds: number[],
  ): Promise<FinishProcessUploadResponse> {
    return this.uploadsVideoService.finishProcessingUpload({
      ytChannelId,
      ytVideoId,
      savedSeconds,
    });
  }

  @Query(() => [UploadsVideoStoryboardResponse])
  async storyboards(
    @Args('ytChannelId') ytChannelId: string,
  ): Promise<UploadsVideoStoryboardResponse[]> {
    try {
      const results = await this.uploadsVideoService.storyboards(ytChannelId);

      return results.map((result) => ({
        ...result,
        createdAt: result.createdAt.toISOString(),
        updatedAt: result.updatedAt.toISOString(),
        storyboard: {
          ...result.storyboard,
          createdAt: result.storyboard.createdAt.toISOString(),
          updatedAt: result.storyboard.updatedAt.toISOString(),
        },
      }));
    } catch {
      return [];
    }
  }

  @Query(() => VideoByYtIdResponse)
  async getVideoByYtId(
    @Args('getVideoByYtIdInput') getVideoByYtIdInput: GetVideoByYtIdInput,
  ): Promise<VideoByYtIdResponse> {
    try {
      return this.uploadsVideoService.getVideoByYtId(getVideoByYtIdInput);
    } catch {
      throw new Error('Failed to fetch video');
    }
  }
}
