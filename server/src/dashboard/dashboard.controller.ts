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

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Post()
  fetchDashboard(@Body() fetchDashboardDto: fetchDashboardDto) {
    return this.dashboardService.fetchDashboard(fetchDashboardDto);
  }

  @Post('count')
  getDashboardCount(@Body() fetchDashboardDto: fetchDashboardDto) {
    return this.dashboardService.getDashboardCount(fetchDashboardDto);
  }

  @Get('channels-without-screenshots')
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

  @Get('channels-without-uploads')
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
