import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { SettingsI } from './types';

@Injectable()
export class SettingsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getSettings(): Promise<SettingsI> {
    const setting = await this.prismaService.setting.findUnique({
      where: { key: 'autoDownload' },
    });
    return { autoDownload: setting?.boolValue ?? false };
  }

  async setSettings(input: SettingsI): Promise<SettingsI> {
    await this.prismaService.setting.upsert({
      where: { key: 'autoDownload' },
      update: { boolValue: input.autoDownload },
      create: { key: 'autoDownload', boolValue: input.autoDownload },
    });
    return input;
  }
}
