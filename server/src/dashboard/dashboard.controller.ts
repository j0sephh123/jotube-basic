import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
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

  @Post('count')
  getDashboardCount(@Body() fetchDashboardDto: fetchDashboardDto) {
    return this.dashboardService.getDashboardCount(fetchDashboardDto);
  }

  @Get('no-screenshots')
  getChannelsWithoutScreenshotsCount(
    @Query('sortOrder') sortOrder: 'asc' | 'desc' = 'desc',
    @Query('page', new ParseIntPipe()) page: number = 1,
    @Query('perPage', new ParseIntPipe()) perPage: number = 20,
  ) {
    return this.dashboardService.getChannelsWithoutScreenshots({
      sortOrder,
      page,
      perPage,
    });
  }

  @Get('no-uploads')
  getChannelsWithoutUploads(
    @Query('sortField') sortField: 'createdAt' | 'videoCount' = 'createdAt',
    @Query('direction') direction: 'asc' | 'desc' = 'desc',
  ) {
    return this.dashboardService.getChannelsWithoutUploads(
      sortField,
      direction,
    );
  }
}
