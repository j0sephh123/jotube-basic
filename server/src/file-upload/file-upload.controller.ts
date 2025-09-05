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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { FileUploadService } from './file-upload.service';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';

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
    @Body() body: { a: string },
  ) {
    console.log({ a: body.a });
    if (!file) {
      console.error('No file received. Check field name and multipart setup.');
      throw new HttpException('Missing file', HttpStatus.BAD_REQUEST);
    }

    const cwd = process.cwd();
    const uploadsRoot = path.resolve(cwd, 'uploads');
    const ext = path.extname(file.originalname).toLowerCase();

    const base = path.basename(file.originalname, ext);
    const safeBase = base.replace(/[^a-z0-9-_]/gi, '_');
    const unique = `${safeBase}-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    const targetPath = path.join(uploadsRoot, unique);

    try {
      await fs.mkdir(uploadsRoot, { recursive: true });
      await fs.writeFile(targetPath, file.buffer, { flag: 'wx' });
    } catch (e: any) {
      console.error('fs write failed:', e?.code, e?.message);
      throw new HttpException(
        'Persist failed: ' + e?.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return { ok: true, path: targetPath };
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
