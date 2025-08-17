import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UploadsVideoService } from './uploads-video.service';
import { DeleteUploadsResponse } from './dtos/delete-uploads.response';
import { FinishProcessUploadResponse } from './dtos/finish-process-upload.response';

@Resolver()
export class UploadsVideoResolver {
  constructor(private readonly uploadsVideoService: UploadsVideoService) {}

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
