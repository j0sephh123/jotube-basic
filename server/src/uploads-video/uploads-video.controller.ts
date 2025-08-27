import { Body, Controller, Post, Get, Param, Query } from '@nestjs/common';
import { saveUploadDto } from 'src/uploads-video/dtos/save-upload.dto';
import { UploadsVideoService } from './uploads-video.service';
import { fetchUploadsDto } from 'src/uploads-video/dtos/fetch-uploads.dto';
import { syncUploadsDto } from 'src/uploads-video/dtos/sync-uploads.dto';
import { cleanShortUploadsDto } from './dtos/clean-short-uploads.dto';
import { SortOrder } from './dtos/uploads-list.input';

@Controller('uploads-video')
export class UploadsVideoController {
  constructor(private readonly uploadsVideoService: UploadsVideoService) {}

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

  @Post('/clean-short-uploads')
  cleanShortUploads(@Body() body: cleanShortUploadsDto) {
    return this.uploadsVideoService.cleanShortUploads(body);
  }

  @Get('/uploads-list/:ytChannelId')
  uploadsList(
    @Param('ytChannelId') ytChannelId: string,
    @Query('sortOrder') sortOrder: SortOrder,
    @Query('type') type: string,
  ) {
    return this.uploadsVideoService.uploadsList({
      ytChannelId,
      sortOrder,
      type,
      take: 50,
    });
  }

  @Get('/storyboards/:ytChannelId')
  storyboards(@Param('ytChannelId') ytChannelId: string) {
    return this.uploadsVideoService.storyboards(ytChannelId);
  }
}
