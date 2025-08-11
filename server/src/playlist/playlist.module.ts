import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PlaylistController } from './playlist.controller';
import { PlaylistService } from './playlist.service';
import { YoutubeService } from 'src/core/external-services/youtube-api/youtube.service';
import { DatabaseModule } from 'src/core/database/database.module';
import { ArtifactsAggregatorModule } from 'src/artifacts-aggregator/artifacts-aggregator.module';

@Module({
  imports: [ConfigModule, DatabaseModule, ArtifactsAggregatorModule],
  controllers: [PlaylistController],
  providers: [PlaylistService, YoutubeService],
  exports: [PlaylistService],
})
export class PlaylistModule {}
