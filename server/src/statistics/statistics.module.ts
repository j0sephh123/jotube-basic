import { Module } from '@nestjs/common';
import { StatisticsController } from './statistics.controller';
import { StatisticsResolver } from './statistics.resolver';
import { StatisticsService } from './statistics.service';
import { DatabaseModule } from 'src/core/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [StatisticsController],
  providers: [StatisticsResolver, StatisticsService],
  exports: [StatisticsService],
})
export class StatisticsModule {}
