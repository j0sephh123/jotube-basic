import { Injectable } from '@nestjs/common';
import { UploadFileResponse } from './dtos/upload-file.response';
import { FileOperationService } from '../file/file-operation.service';
import { FilePathService } from '../file/file-path.service';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly fileOperationService: FileOperationService,
    private readonly filePathService: FilePathService,
  ) {}

  async uploadFile(file: Express.Multer.File): Promise<UploadFileResponse> {
    console.log('Uploading file:', file);

    if (!file) {
      throw new Error('No file provided');
    }

    const fileId = path.parse(file.filename).name;
    const fileName = file.filename;

    return {
      id: fileId,
      filename: fileName,
      originalName: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      path: file.path,
      uploadedAt: new Date(),
      status: 'uploaded',
    };
  }

  async getUploadedFiles(): Promise<UploadFileResponse[]> {
    console.log('Getting uploaded files');

    const uploadDir = path.join(process.cwd(), 'uploads');

    try {
      await fs.access(uploadDir);
    } catch {
      return [];
    }

    const files = await fs.readdir(uploadDir);
    const fileResponses: UploadFileResponse[] = [];

    for (const fileName of files) {
      const filePath = path.join(uploadDir, fileName);
      const stats = await fs.stat(filePath);

      if (stats.isFile()) {
        const fileId = path.parse(fileName).name;
        fileResponses.push({
          id: fileId,
          filename: fileName,
          originalName: fileName,
          mimetype: 'application/octet-stream',
          size: stats.size,
          path: filePath,
          uploadedAt: stats.birthtime,
          status: 'uploaded',
        });
      }
    }

    return fileResponses.sort(
      (a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime(),
    );
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
