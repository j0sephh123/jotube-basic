import { Injectable } from '@nestjs/common';
import { FileOperationService } from './file-operation.service';
import { FilePathService } from './file-path.service';
import {
  DeleteFileDto,
  DeleteFileResponse,
  DeleteType,
} from './delete-file.dto';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class DeleteFileService {
  constructor(
    private readonly fileOperationService: FileOperationService,
    private readonly filePathService: FilePathService,
  ) {}

  async deleteFileOrDirectory(
    deleteFileDto: DeleteFileDto,
  ): Promise<DeleteFileResponse> {
    const { ytChannelId, ytVideoId, deleteType } = deleteFileDto;
    const basePath = this.filePathService.getBasePath();

    try {
      switch (deleteType) {
        case DeleteType.VIDEO:
          return await this.deleteVideoFile(ytChannelId, ytVideoId, basePath);
        case DeleteType.SAVED_SCREENSHOTS:
          return await this.deleteDirectory(
            ytChannelId,
            ytVideoId,
            'saved_screenshots',
            basePath,
          );
        case DeleteType.ALL_SCREENSHOTS:
          return await this.deleteDirectory(
            ytChannelId,
            ytVideoId,
            'all_screenshots',
            basePath,
          );
        case DeleteType.THUMBNAILS:
          return await this.deleteDirectory(
            ytChannelId,
            ytVideoId,
            'thumbnails',
            basePath,
          );
        default:
          return { success: false, message: 'Invalid delete type' };
      }
    } catch (error) {
      console.error('Error deleting file/directory:', error);
      return { success: false, message: 'Failed to delete file/directory' };
    }
  }

  private async deleteVideoFile(
    ytChannelId: string,
    ytVideoId: string,
    basePath: string,
  ): Promise<DeleteFileResponse> {
    const videoDir = `${basePath}/${ytChannelId}/${ytVideoId}`;

    try {
      const files = await fs.readdir(videoDir);
      const videoFile = files.find((file) => {
        const ext = path.extname(file).toLowerCase();
        return (
          ['.mp4', '.mkv', '.webm', '.avi', '.mov', '.m4v', 'wmv'].includes(
            ext,
          ) || file.endsWith('.part')
        );
      });

      if (!videoFile) {
        return { success: false, message: 'Video file not found' };
      }

      const videoPath = `${videoDir}/${videoFile}`;
      await this.fileOperationService.deleteFile(videoPath);
      return { success: true, message: 'Video file deleted successfully' };
    } catch (error) {
      console.error('Error finding/deleting video file:', error);
      return { success: false, message: 'Failed to find or delete video file' };
    }
  }

  private async deleteDirectory(
    ytChannelId: string,
    ytVideoId: string,
    dirName: string,
    basePath: string,
  ): Promise<DeleteFileResponse> {
    const dirPath = `${basePath}/${ytChannelId}/${ytVideoId}/${dirName}`;

    const exists = await this.fileOperationService.fileExistsSafe(dirPath);
    if (!exists) {
      return { success: false, message: `${dirName} directory not found` };
    }

    await this.fileOperationService.deleteDirectory(dirPath);
    return {
      success: true,
      message: `${dirName} directory deleted successfully`,
    };
  }
}
