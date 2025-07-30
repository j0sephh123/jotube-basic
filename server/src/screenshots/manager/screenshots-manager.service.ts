import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { DirectoryService } from 'src/file/directory.service';
import { FileOperationService } from 'src/file/file-operation.service';
import { FilePathService } from 'src/file/file-path.service';

@Injectable()
export class ScreenshotsManagerService {
  constructor(
    private readonly filePathService: FilePathService,
    private readonly directoryService: DirectoryService,
    private readonly fileOperationService: FileOperationService,
  ) {}

  deleteFileSync({
    videoName,
    ytChannelId,
    ytVideoId,
  }: {
    ytChannelId: string;
    ytVideoId: string;
    videoName: string;
  }) {
    const filePath = `${this.filePathService.getBasePath()}/${ytChannelId}/${ytVideoId}/saved_screenshots/${videoName}`;

    try {
      fs.accessSync(filePath);
      fs.unlinkSync(filePath);
      return true;
    } catch {
      return false;
    }
  }

  deleteScreenshot(ytChannelId: string, ytVideoId: string, second: number) {
    const fileName = `${ytVideoId}-${second}.png`;
    const filePath = `${this.filePathService.getBasePath()}/${ytChannelId}/${ytVideoId}/saved_screenshots/${fileName}`;

    try {
      fs.accessSync(filePath);
      fs.unlinkSync(filePath);
      return true;
    } catch {
      return false;
    }
  }

  getPaths(ytChannelId: string, ytVideoId: string) {
    const channelBase = `${this.filePathService.getBasePath()}/${ytChannelId}`;
    const idFolderPath = path.join(channelBase, ytVideoId);
    const screenshotsPath = path.join(idFolderPath, 'all_screenshots');

    const videoFilePath = this.getVideoFilePath(ytChannelId, ytVideoId);
    const videoPath = videoFilePath
      ? path.join(idFolderPath, videoFilePath)
      : null;

    if (!fs.existsSync(idFolderPath)) {
      fs.mkdirSync(idFolderPath, { recursive: true });
    }
    if (!fs.existsSync(screenshotsPath)) {
      fs.mkdirSync(screenshotsPath, { recursive: true });
    }

    return {
      screenshotsPath,
      videoPath,
      videoFilePath,
    };
  }

  async processScreenshotsForUpload(
    ytChannelId: string,
    ytVideoId: string,
    savedSeconds: number[],
  ): Promise<void> {
    await this.createSavedScreenshotsDirectory(ytChannelId, ytVideoId);
    await this.copyScreenshotsToSaved(ytChannelId, ytVideoId, savedSeconds);
    await this.deleteAllScreenshots({ ytChannelId, ytVideoId });
  }

  private async createSavedScreenshotsDirectory(
    ytChannelId: string,
    ytVideoId: string,
  ): Promise<void> {
    const uploadPath = `${this.filePathService.getBasePath()}/${ytChannelId}/${ytVideoId}`;
    await this.directoryService.createDirectory(
      `${uploadPath}/saved_screenshots`,
    );
  }

  private async copyScreenshotsToSaved(
    ytChannelId: string,
    ytVideoId: string,
    savedSeconds: number[],
  ): Promise<void> {
    const uploadPath = `${this.filePathService.getBasePath()}/${ytChannelId}/${ytVideoId}`;

    for (const second of savedSeconds) {
      const name = `${ytVideoId}-${second}.png`;
      const sourcePath = `${uploadPath}/all_screenshots/${name}`;
      const destinationPath = `${uploadPath}/saved_screenshots/${name}`;
      await this.fileOperationService.handleCopyImage(
        sourcePath,
        destinationPath,
      );
    }
  }

  private async deleteAllScreenshots({
    ytChannelId,
    ytVideoId,
  }: {
    ytChannelId: string;
    ytVideoId: string;
  }) {
    const screenshotsFolderPath = `${this.filePathService.getBasePath()}/${ytChannelId}/${ytVideoId}/all_screenshots`;

    try {
      await this.fileOperationService.fileExists(screenshotsFolderPath);
      await this.directoryService.deleteDirectory(screenshotsFolderPath);

      return {
        success: true,
      };
    } catch (error) {
      console.error('Error deleting screenshots folder:', error);
      return {
        success: false,
      };
    }
  }

  getVideoFilePath(ytChannelId: string, ytVideoId: string) {
    const basePath = this.filePathService.getBasePath();
    const dirPath = `${basePath}/${ytChannelId}/${ytVideoId}`;
    try {
      if (!fs.existsSync(dirPath)) {
        return null;
      }

      const files = fs.readdirSync(dirPath);
      const videoFile = files.find((file) =>
        ['.mp4', '.mkv', '.webm'].includes(path.extname(file).toLowerCase()),
      );

      return videoFile || null;
    } catch {
      return null;
    }
  }
}
