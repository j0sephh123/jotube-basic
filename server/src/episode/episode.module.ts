import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EpisodeService } from './episode.service';
import { DatabaseModule } from 'src/core/database/database.module';
import { EpisodeResolver } from './episode.resolver';

@Module({
  imports: [ConfigModule, DatabaseModule],
  controllers: [],
  providers: [EpisodeService, EpisodeResolver],
  exports: [EpisodeService],
})
export class EpisodeModule {}
