import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TvService } from './tv.service';
import { DatabaseModule } from 'src/core/database/database.module';
import { TvResolver } from './tv.resolver';

@Module({
  imports: [ConfigModule, DatabaseModule],
  controllers: [],
  providers: [TvService, TvResolver],
  exports: [TvService],
})
export class TvModule {}
