import { Body, Controller, Post, Get, Param, Query } from '@nestjs/common';
import { FinishProcessUploadDto } from 'src/uploads-video/dtos/finish-process-upload.dto';
import { saveUploadDto } from 'src/uploads-video/dtos/save-upload.dto';
import { UploadsVideoService } from './uploads-video.service';
import { deleteUploadsDto } from 'src/uploads-video/dtos/delete-uploads.dto';
import { fetchUploadsDto } from 'src/uploads-video/dtos/fetch-uploads.dto';
import { syncUploadsDto } from 'src/uploads-video/dtos/sync-uploads.dto';
import { savedUploadsDto } from 'src/uploads-video/dtos/saved-uploads.dto';

@Controller('uploads-video')
export class UploadsVideoController {
  constructor(private readonly uploadsVideoService: UploadsVideoService) {}

  @Post('/delete-uploads')
  async deleteUploads(@Body() deleteUploadsDto: deleteUploadsDto) {
    return this.uploadsVideoService.deleteUploads(deleteUploadsDto);
  }

  @Post('/finish-processing-upload')
  finishProcessingUpload(@Body() body: FinishProcessUploadDto) {
    return this.uploadsVideoService.finishProcessingUpload(body);
  }

  @Post('/save-upload')
  saveUpload(@Body() body: saveUploadDto) {
    return this.uploadsVideoService.saveUpload(body);
  }

  @Post('/fetch-uploads')
  fetchUploads(@Body() fetchUploadsDto: fetchUploadsDto) {
    return this.uploadsVideoService.fetchUploads(fetchUploadsDto);
  }

  @Post('/sync-uploads')
  syncUploads(@Body() syncUploadsDto: syncUploadsDto) {
    return this.uploadsVideoService.syncUploads(syncUploadsDto);
  }

  @Post('/saved-uploads')
  savedUploads(@Body() body: savedUploadsDto) {
    return this.uploadsVideoService.savedUploads(body);
  }

  @Get('/uploads-list/:ytChannelId')
  uploadsList(
    @Param('ytChannelId') ytChannelId: string,
    @Query('sortOrder') sortOrder: 'asc' | 'desc',
  ) {
    return this.uploadsVideoService.uploadsList(ytChannelId, sortOrder);
  }
}
