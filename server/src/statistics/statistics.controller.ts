import { Controller, Get } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { exec } from 'child_process';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get('free-space')
  async getFreeSpace() {
    return new Promise((resolve, reject) => {
      exec('df -h --output=avail /', (error, stdout) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          reject({ error: error.message });
          return;
        }
        const freeSpace = stdout.split('\n')[1].trim();
        resolve({ freeSpace });
      });
    });
  }

  @Get('total-screenshots')
  async getTotalScreenshots() {
    const count = await this.prismaService.screenshot.count();

    return count;
  }

  @Get('total-thumbnails')
  async getTotalThumbnails() {
    const count = await this.prismaService.thumbnail.count();

    return count;
  }
}
