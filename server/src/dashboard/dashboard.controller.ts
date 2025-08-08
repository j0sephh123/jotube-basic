import { Body, Controller, Post } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { fetchDashboardDto } from './dtos/fetch-dashboard.dto';
import { DashboardResponse } from './types';

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
