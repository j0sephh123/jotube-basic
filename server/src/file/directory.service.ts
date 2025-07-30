import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as fsSync from 'fs';
import { FilePathService } from './file-path.service';

@Injectable()
export class DirectoryService {
  constructor(private readonly filePathService: FilePathService) {}

  async createDirectory(directoryPath: string): Promise<void> {
    try {
      await fs.mkdir(directoryPath, { recursive: true });
    } catch (error) {
      throw error;
    }
  }

  async deleteDirectory(directoryPath: string): Promise<void> {
    try {
      const exists = await this.directoryExistsSafe(directoryPath);
      if (exists) {
        await fs.rm(directoryPath, { recursive: true });
      } else {
      }
    } catch {}
  }

  async deleteVideoDirectory(
    ytChannelId: string,
    ytVideoId: string,
  ): Promise<void> {
    const uploadPath = `${this.filePathService.getBasePath()}/${ytChannelId}/${ytVideoId}`;
    await this.deleteDirectory(uploadPath);
  }

  async directoryExistsSafe(directoryPath: string): Promise<boolean> {
    try {
      const stats = await fs.stat(directoryPath);
      const exists = stats.isDirectory();
      return exists;
    } catch {
      return false;
    }
  }

  deleteDirSync({
    ytChannelId,
    ytVideoId,
  }: {
    ytChannelId: string;
    ytVideoId: string;
  }) {
    const dirPath = `${this.filePathService.getBasePath()}/${ytChannelId}/${ytVideoId}`;
    try {
      fsSync.rmdirSync(dirPath, { recursive: true });
      return true;
    } catch {
      return false;
    }
  }
}
