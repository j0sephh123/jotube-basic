import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import { exec } from 'child_process';
import { promisify } from 'util';
import { FolderScannerInput } from './dtos/folder-scanner.input';
import {
  FolderScannerResponse,
  FileInfo,
} from './dtos/folder-scanner.response';
import { FilePathService } from 'src/file/file-path.service';

const execAsync = promisify(exec);

@Injectable()
export class FolderScannerService {
  constructor(private readonly filePathService: FilePathService) {}

  private async getVideoDuration(filePath: string): Promise<number> {
    try {
      const { stdout } = await execAsync(
        `ffprobe -v quiet -show_entries format=duration -of csv=p=0 "${filePath}"`,
      );
      const duration = parseFloat(stdout.trim());
      return isNaN(duration) ? 0 : Math.floor(duration);
    } catch (error) {
      console.error(`Error getting duration for ${filePath}:`, error);
      return 0;
    }
  }

  async scanFolder(input: FolderScannerInput): Promise<FolderScannerResponse> {
    const tvPath = this.filePathService.getTvPath();

    if (input.structure !== 'standard') {
      throw new Error(
        'Unsupported structure. Supported structures are: standard',
      );
    }

    const fullPath = `${tvPath}/${input.path}`;

    let rootDirContents: string[];
    try {
      rootDirContents = await fs.readdir(fullPath);
    } catch (error) {
      console.error('Error reading directory:', error);
      throw new Error(`Directory not found: ${fullPath}`);
    }

    if (input.ignoreDirs.length > 0) {
      rootDirContents = rootDirContents.filter(
        (file) => !input.ignoreDirs.includes(file),
      );
    }

    const promises = rootDirContents.map(async (file) => {
      const filePath = `${tvPath}/${input.path}/${file}`;
      const videoFile = await fs.readdir(filePath);

      const filePromises = videoFile.map<Promise<FileInfo>>(
        async (videoFile) => {
          const fullPath = `${tvPath}/${input.path}/${file}/${videoFile}`;
          const stats = await fs.stat(fullPath);
          const duration = await this.getVideoDuration(fullPath);

          return {
            fileName: `${file}.${videoFile.split('.').slice(0, -1).join('.')}`,
            size: Math.round(stats.size / (1024 * 1024)),
            duration,
            format: videoFile.split('.').pop() || 'unknown',
            fullPath: `${tvPath}/${input.path}/${file}/${videoFile}`,
          };
        },
      );

      return Promise.all(filePromises);
    });

    const results = await Promise.all(promises);

    return {
      files: results.flat(),
    };
  }
}
