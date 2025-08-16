import { Module } from '@nestjs/common';
import { StatisticsController } from './statistics.controller';
import { StatisticsResolver } from './statistics.resolver';
import { DatabaseModule } from 'src/core/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [StatisticsController],
  providers: [StatisticsResolver],
})
export class StatisticsModule {}
