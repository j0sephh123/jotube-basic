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
import { SavedUploadsResponse } from './dtos/saved-uploads.response';
import { SavedUploadsInput } from './dtos/saved-uploads.input';
import { ChannelUploadsResponse } from './dtos/uploads-list.response';
import { UploadsListInput } from './dtos/uploads-list.input';
import { UploadsVideoStoryboardResponse } from './dtos/storyboards.response';

@Resolver()
export class UploadsVideoResolver {
  constructor(private readonly uploadsVideoService: UploadsVideoService) {}

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

  @Query(() => ChannelUploadsResponse, { nullable: true })
  async uploadsList(
    @Args('uploadsListInput') uploadsListInput: UploadsListInput,
  ): Promise<ChannelUploadsResponse | null> {
    try {
      const result = await this.uploadsVideoService.uploadsList(
        uploadsListInput.ytChannelId,
        uploadsListInput.sortOrder,
      );

      if (!result) {
        return null;
      }

      return {
        ...result,
        createdAt: result.createdAt.toISOString(),
        updatedAt: result.updatedAt.toISOString(),
        lastSyncedAt: result.lastSyncedAt?.toISOString() || null,
        uploads: result.uploads.map((upload) => ({
          ...upload,
          createdAt: upload.createdAt.toISOString(),
          updatedAt: upload.updatedAt.toISOString(),
        })),
      };
    } catch {
      return null;
    }
  }

  @Query(() => [SavedUploadsResponse])
  async savedUploads(
    @Args('savedUploadsInput') savedUploadsInput: SavedUploadsInput,
  ): Promise<SavedUploadsResponse[]> {
    try {
      const results =
        await this.uploadsVideoService.savedUploads(savedUploadsInput);

      return results.map((result) => ({
        ...result,
        channel: result.channel
          ? {
              ...result.channel,
              uploads: result.channel.uploads.map((upload) => ({
                ...upload,
                createdAt: upload.createdAt.toISOString(),
              })),
              totalUploads: result.channel.uploads.length,
            }
          : null,
        uploads: result.uploads.map((upload) => ({
          ...upload,
          createdAt: upload.createdAt.toISOString(),
        })),
      }));
    } catch {
      return [];
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
      const result =
        await this.uploadsVideoService.syncUploads(syncUploadsInput);
      return result;
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
}
