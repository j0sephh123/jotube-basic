import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma/prisma.service';

@Injectable()
export class SettingsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAutoDownload(): Promise<boolean> {
    const setting = await this.prismaService.setting.findUnique({
      where: { key: 'autoDownload' },
    });
    return setting?.boolValue ?? false;
  }

  async setAutoDownload(enabled: boolean): Promise<boolean> {
    await this.prismaService.setting.upsert({
      where: { key: 'autoDownload' },
      update: { boolValue: enabled },
      create: { key: 'autoDownload', boolValue: enabled },
    });
    return enabled;
  }
}
