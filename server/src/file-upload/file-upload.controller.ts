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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { FileUploadService } from './file-upload.service';

@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileExtension = path.extname(file.originalname);
          const baseName = path.basename(file.originalname, fileExtension);
          cb(null, `${baseName}-${uniqueSuffix}${fileExtension}`);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      return await this.fileUploadService.uploadFile(file);
    } catch (error) {
      throw new HttpException(
        error.message || 'File upload failed',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('files')
  async getUploadedFiles() {
    try {
      return await this.fileUploadService.getUploadedFiles();
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to get uploaded files',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('file/:fileId')
  async deleteUploadedFile(@Param('fileId') fileId: string) {
    try {
      await this.fileUploadService.deleteUploadedFile(fileId);
      return { message: 'File deleted successfully' };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to delete file',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
