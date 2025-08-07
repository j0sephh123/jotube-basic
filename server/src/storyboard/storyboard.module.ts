import { Module } from '@nestjs/common';
import { StoryboardService } from './storyboard.service';
import { DatabaseModule } from 'src/core/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [StoryboardService],
  exports: [StoryboardService],
})
export class StoryboardModule {}
