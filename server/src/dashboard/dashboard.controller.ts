import { Body, Controller, Post } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { fetchDashboardDto } from './dtos/fetch-dashboard.dto';
import { ChannelsDashboardResponse } from './types';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Post('channels')
  async fetchDashboard(
    @Body() fetchDashboardDto: fetchDashboardDto,
  ): Promise<ChannelsDashboardResponse> {
    return this.dashboardService.fetchDashboard(fetchDashboardDto);
  }

  @Post('videos')
  async fetchVideosDashboard(): Promise<any[]> {
    return this.dashboardService.fetchVideosDashboard();
  }
}
