import { Controller, Get, Post, Body } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsI } from './types';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get('')
  async getSettings(): Promise<SettingsI> {
    return this.settingsService.getSettings();
  }

  @Post('')
  async setSettings(@Body() input: SettingsI): Promise<SettingsI> {
    return this.settingsService.setSettings(input);
  }
}
