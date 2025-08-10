import { Module } from '@nestjs/common';
import { ArtifactsAggregatorService } from './artifacts-aggregator.service';
import { DatabaseModule } from 'src/core/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [ArtifactsAggregatorService],
  exports: [ArtifactsAggregatorService],
})
export class ArtifactsAggregatorModule {}
