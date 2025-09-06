import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FilePathService } from '../file/file-path.service';
import * as fs from 'fs/promises';
import * as path from 'path';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { Episode } from '@prisma/client';
import { GetUploadedFilesResponse } from './dtos/get-uploaded-files.response';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly filePathService: FilePathService,
    private readonly prismaService: PrismaService,
  ) {}

  async uploadFile(
    file: Express.Multer.File,
    episodeId: Episode['id'],
  ): Promise<{ ok: boolean; path: string }> {
    const episode = await this.prismaService.episode.findUnique({
      where: { id: episodeId },
      include: {
        tv: true,
      },
    });

    if (!episode) {
      throw new HttpException('Episode not found', HttpStatus.BAD_REQUEST);
    }

    if (!file) {
      console.error('No file received. Check field name and multipart setup.');
      throw new HttpException('Missing file', HttpStatus.BAD_REQUEST);
    }

    const basePath = this.filePathService.getBasePath();
    const collectionPath = episode.tv.identifier;
    const episodePath = episode.identifier;
    const fileExtension = path.extname(file.originalname);
    const newFileName = `${episode.identifier}${fileExtension}`;
    const targetPath = path.join(
      basePath,
      collectionPath,
      episodePath,
      newFileName,
    );

    try {
      await fs.writeFile(targetPath, file.buffer, { flag: 'wx' });
    } catch (e: any) {
      console.error('fs write failed:', e?.code, e?.message);
      throw new HttpException(
        'Persist failed: ' + e?.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return { ok: true, path: file.path };
  }

  async getUploadedFiles(
    episodeId: Episode['id'],
  ): Promise<GetUploadedFilesResponse[]> {
    console.log({ episodeId });

    const episode = await this.prismaService.episode.findUnique({
      where: { id: episodeId },
      include: {
        tv: true,
      },
    });

    const basePath = this.filePathService.getBasePath();
    const collectionPath = episode.tv.identifier;
    const episodePath = episode.identifier;
    const uploadDir = path.join(basePath, collectionPath, episodePath);

    if (!episode) {
      throw new Error(`Episode with ID ${episodeId} not found`);
    }

    try {
      await fs.access(uploadDir);
    } catch {
      return [];
    }

    const files = await fs.readdir(uploadDir);
    const fileInfos: GetUploadedFilesResponse[] = [];

    for (const filename of files) {
      const filePath = path.join(uploadDir, filename);
      try {
        const stats = await fs.stat(filePath);
        let sizeInBytes = stats.size;

        if (stats.isDirectory()) {
          sizeInBytes = await this.calculateDirectorySize(filePath);
        }

        fileInfos.push({
          filename,
          sizeInBytes,
        });
      } catch (error) {
        console.warn(`Failed to get stats for file ${filename}:`, error);
      }
    }

    return fileInfos;
  }

  private async calculateDirectorySize(dirPath: string): Promise<number> {
    let totalSize = 0;

    try {
      const items = await fs.readdir(dirPath);

      for (const item of items) {
        const itemPath = path.join(dirPath, item);
        const stats = await fs.stat(itemPath);

        if (stats.isDirectory()) {
          totalSize += await this.calculateDirectorySize(itemPath);
        } else {
          totalSize += stats.size;
        }
      }
    } catch (error) {
      console.warn(`Failed to calculate size for directory ${dirPath}:`, error);
    }

    return totalSize;
  }

  async deleteEpisodeFile(fileName: string, episodeId: number) {
    const episode = await this.prismaService.episode.findUnique({
      where: { id: episodeId },
      include: {
        tv: true,
      },
    });

    if (!episode) {
      throw new HttpException('Episode not found', HttpStatus.BAD_REQUEST);
    }

    const basePath = this.filePathService.getBasePath();
    const collectionPath = episode.tv.identifier;
    const episodePath = episode.identifier;
    const targetPath = path.join(
      basePath,
      collectionPath,
      episodePath,
      fileName,
    );

    try {
      const stats = await fs.stat(targetPath);
      if (stats.isDirectory()) {
        await fs.rm(targetPath, { recursive: true, force: true });
      } else {
        await fs.unlink(targetPath);
      }
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
    }
  }
}
