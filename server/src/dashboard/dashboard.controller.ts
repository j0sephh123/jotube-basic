import { Body, Controller, Post } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { fetchDashboardDto } from './dtos/fetch-dashboard.dto';

interface DashboardResponse {
  channels: Array<{
    id: number;
    createdAt: Date;
    title: string;
    ytId: string;
    src: string;
    lastSyncedAt: Date | null;
    thumbnails: number;
    saved: number;
    defaults: number;
    uploadsWithScreenshots: number;
    screenshotsCount: number;
    screenshots: Array<{
      ytVideoId: string;
      second: number;
    }>;
  }>;
  total: number;
}

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Post()
  async fetchDashboard(
    @Body() fetchDashboardDto: fetchDashboardDto,
  ): Promise<DashboardResponse> {
    return this.dashboardService.fetchDashboard(fetchDashboardDto);
  }
}
