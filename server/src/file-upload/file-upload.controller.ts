import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { FileUploadService } from './file-upload.service';
import { GetUploadedFilesResponse } from './dtos/get-uploaded-files.response';

@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: 5 * 1024 * 1024 * 1024 }, // 5GB
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('episodeId', ParseIntPipe) episodeId: number,
  ) {
    return this.fileUploadService.uploadFile(file, episodeId);
  }

  @Get('files/:fileId')
  async getUploadedFiles(
    @Param('fileId', ParseIntPipe) fileId: number,
  ): Promise<GetUploadedFilesResponse[]> {
    try {
      return await this.fileUploadService.getUploadedFiles(fileId);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to get uploaded files',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('file/:episodeId')
  async deleteEpisodeFile(
    @Param('episodeId', ParseIntPipe) episodeId: number,
    @Body('fileName') fileName: string,
  ) {
    try {
      await this.fileUploadService.deleteEpisodeFile(fileName, episodeId);
      return { message: 'File deleted successfully' };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to delete file',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
