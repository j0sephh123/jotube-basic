import { Injectable } from '@nestjs/common';
import { FilePathService } from 'src/file/file-path.service';
import { FileOperationService } from 'src/file/file-operation.service';

@Injectable()
export class ThumbnailsManagerService {
  constructor(
    private readonly filePathService: FilePathService,
    private readonly fileOperationService: FileOperationService,
  ) {}

  // TODO fix
  async deleteThumbnail(channel: string, video: string): Promise<void> {
    const thumbnailsFolder = `${this.filePathService.getBasePath()}/${channel}/${video}/thumbnails`;
    const thumbnailsFolderExists =
      await this.fileOperationService.fileExistsSafe(thumbnailsFolder);

    if (thumbnailsFolderExists) {
      await this.fileOperationService.deleteDirectory(thumbnailsFolder);
    }
  }

  async countThumbnails(channel: string, video: string): Promise<number> {
    const thumbnailsFolder = `${this.filePathService.getBasePath()}/${channel}/${video}/thumbnails`;

    console.log('thumbnailsFolder', thumbnailsFolder);

    const thumbnailsFolderExists =
      await this.fileOperationService.fileExistsSafe(thumbnailsFolder);
    if (thumbnailsFolderExists) {
      const files = await this.fileOperationService.listFiles(thumbnailsFolder);
      return files.length;
    }
    return 0;
  }
}
