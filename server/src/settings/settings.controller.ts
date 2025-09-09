import { Controller, Get, Post, Body } from '@nestjs/common';
import { SettingsService } from './settings.service';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get('auto-download')
  async getAutoDownload(): Promise<boolean> {
    return this.settingsService.getAutoDownload();
  }

  @Post('auto-download')
  async setAutoDownload(@Body() body: { enabled: boolean }): Promise<boolean> {
    return this.settingsService.setAutoDownload(body.enabled);
  }
}
