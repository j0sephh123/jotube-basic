import { Body, Controller, Post } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';
import { OpenDirectoryDto } from './open-directory.dto';
import { FilePathService } from './file-path.service';

const execAsync = promisify(exec);

@Controller('open-directory')
export class OpenDirectoryController {
  constructor(private readonly filePathService: FilePathService) {}

  @Post('/')
  async openDirectory(@Body() { ytChannelId, ytVideoId }: OpenDirectoryDto) {
    const basePath = this.filePathService.getBasePath();
    const fullPath = ytVideoId
      ? `${basePath}/${ytChannelId}/${ytVideoId}`
      : `${basePath}/${ytChannelId}`;

    try {
      await execAsync(`nemo ${fullPath}`);
      return { success: true };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return { success: false };
    }
  }
}
