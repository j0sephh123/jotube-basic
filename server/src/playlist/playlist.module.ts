import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PlaylistService } from './playlist.service';
import { PlaylistResolver } from './playlist.resolver';
import { YoutubeService } from 'src/core/external-services/youtube-api/youtube.service';
import { DatabaseModule } from 'src/core/database/database.module';
import { ArtifactsAggregatorModule } from 'src/artifacts-aggregator/artifacts-aggregator.module';

@Module({
  imports: [ConfigModule, DatabaseModule, ArtifactsAggregatorModule],
  providers: [PlaylistService, PlaylistResolver, YoutubeService],
  exports: [PlaylistService],
})
export class PlaylistModule {}
