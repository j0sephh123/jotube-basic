import { Module } from '@nestjs/common';
import { PlaylistRepositoryService } from './playlist-repository.service';

@Module({
  providers: [PlaylistRepositoryService],
  exports: [PlaylistRepositoryService],
})
export class PlaylistRepositoryModule {}
