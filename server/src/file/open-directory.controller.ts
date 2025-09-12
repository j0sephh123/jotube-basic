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
  async openDirectory(@Body() { collection, media }: OpenDirectoryDto) {
    const basePath = this.filePathService.getBasePath();
    const fullPath = media
      ? `${basePath}/${collection}/${media}`
      : `${basePath}/${collection}`;

    console.log({ collection, media, fullPath });

    try {
      await execAsync(`nemo ${fullPath}`);
      return { success: true };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return { success: false };
    }
  }
}
