import { Injectable } from '@nestjs/common';
import { FilePathService } from './file-path.service';
import { promises as fs } from 'fs';
import { join } from 'path';

@Injectable()
export class FolderService {
  constructor(private readonly filePathService: FilePathService) {}

  async createTvFolder(identifier: string): Promise<void> {
    const basePath = this.filePathService.getBasePath();
    const tvPath = join(basePath, identifier);

    try {
      await fs.mkdir(tvPath, { recursive: true });
    } catch (error) {
      throw new Error(`Failed to create TV folder: ${error.message}`);
    }
  }

  async createEpisodeFolder(
    tvIdentifier: string,
    episodeIdentifier: string,
  ): Promise<void> {
    const basePath = this.filePathService.getBasePath();
    const episodePath = join(basePath, tvIdentifier, episodeIdentifier);

    try {
      await fs.mkdir(episodePath, { recursive: true });
    } catch (error) {
      throw new Error(`Failed to create episode folder: ${error.message}`);
    }
  }

  async deleteTvFolder(identifier: string): Promise<void> {
    const basePath = this.filePathService.getBasePath();
    const tvPath = join(basePath, identifier);

    try {
      await fs.rm(tvPath, { recursive: true, force: true });
    } catch (error) {
      throw new Error(`Failed to delete TV folder: ${error.message}`);
    }
  }

  async deleteEpisodeFolder(
    tvIdentifier: string,
    episodeIdentifier: string,
  ): Promise<void> {
    const basePath = this.filePathService.getBasePath();
    const episodePath = join(basePath, tvIdentifier, episodeIdentifier);

    try {
      await fs.rm(episodePath, { recursive: true, force: true });
    } catch (error) {
      throw new Error(`Failed to delete episode folder: ${error.message}`);
    }
  }
}
