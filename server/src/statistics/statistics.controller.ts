import { Controller, Get } from '@nestjs/common';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('free-space')
  async getFreeSpace(): Promise<number> {
    return this.statisticsService.getFreeSpace();
  }
}
