import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';

@Injectable()
export class FileOperationService {
  async fileExists(filePath: string): Promise<void> {
    try {
      await fs.access(filePath);
    } catch (error) {
      throw error;
    }
  }

  async fileExistsSafe(filePath: string): Promise<boolean> {
    try {
      await this.fileExists(filePath);
      return true;
    } catch {
      return false;
    }
  }

  async deleteFile(filePath: string): Promise<void> {
    try {
      await fs.unlink(filePath);
    } catch (error) {
      throw error;
    }
  }

  async deleteDirectory(dirPath: string): Promise<void> {
    try {
      await fs.rm(dirPath, { recursive: true, force: true });
    } catch (error) {
      throw error;
    }
  }

  async handleCopyImage(path: string, destination: string) {
    try {
      await fs.copyFile(path, destination);
    } catch (error) {
      throw error;
    }
  }

  async moveFile(sourcePath: string, destinationPath: string) {
    try {
      await fs.rename(sourcePath, destinationPath);
    } catch (error) {
      throw error;
    }
  }

  async listFiles(directoryPath: string): Promise<string[]> {
    try {
      const files = await fs.readdir(directoryPath);
      return files;
    } catch (error) {
      throw error;
    }
  }
}
