import { Controller, Get, Param, Res, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { FilePathService } from 'src/file/file-path.service';

@Controller('images')
export class ImagesController {
  constructor(private readonly filePathService: FilePathService) {}

  @Get(':filePath(*)')
  async serveImage(@Param('filePath') filePath: string, @Res() res: Response) {
    const resolvedPath = path.join(
      this.filePathService.getBasePath(),
      filePath,
    );

    try {
      if (fs.existsSync(resolvedPath) && fs.statSync(resolvedPath).isFile()) {
        res.sendFile(resolvedPath);
      } else {
        throw new NotFoundException('File not found');
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new NotFoundException('Error serving file');
    }
  }
}
