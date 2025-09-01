import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/database/database.module';
import { ProcessingPhaseService } from './processing-phase.service';
import { ProcessingPhaseResolver } from './processing-phase.resolver';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [ProcessingPhaseService, ProcessingPhaseResolver],
  exports: [ProcessingPhaseService],
})
export class ProcessingPhaseModule {}
