import { Module } from '@nestjs/common';
import { StoryboardService } from './storyboard.service';
import { StoryboardResolver } from './storyboard.resolver';
import { DatabaseModule } from 'src/core/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [StoryboardService, StoryboardResolver],
  exports: [StoryboardService],
})
export class StoryboardModule {}
