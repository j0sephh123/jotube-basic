import { Injectable } from '@nestjs/common';
import { FileOperationService } from '../file/file-operation.service';
import { FilePathService } from '../file/file-path.service';
import * as fs from 'fs/promises';
import * as path from 'path';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { Episode } from '@prisma/client';
import { GetUploadedFilesResponse } from './dtos/get-uploaded-files.response';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly fileOperationService: FileOperationService,
    private readonly filePathService: FilePathService,
    private readonly prisma: PrismaService,
  ) {}

  // async uploadFile(file: Express.Multer.File): Promise<UploadFileResponse> {
  //   // TODO
  // }

  async getUploadedFiles(
    episodeId: Episode['id'],
  ): Promise<GetUploadedFilesResponse[]> {
    console.log({ episodeId });

    const episode = await this.prisma.episode.findUnique({
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
        fileInfos.push({
          filename,
          sizeInBytes: stats.size,
        });
      } catch (error) {
        console.warn(`Failed to get stats for file ${filename}:`, error);
      }
    }

    return fileInfos;
  }

  async deleteUploadedFile(fileId: string): Promise<void> {
    console.log('Deleting file with ID:', fileId);

    const uploadDir = path.join(process.cwd(), 'uploads');
    const files = await fs.readdir(uploadDir);

    const fileToDelete = files.find((fileName) => {
      const parsedName = path.parse(fileName);
      return parsedName.name === fileId;
    });

    if (!fileToDelete) {
      throw new Error(`File with ID ${fileId} not found`);
    }

    const filePath = path.join(uploadDir, fileToDelete);
    await fs.unlink(filePath);
  }
}
