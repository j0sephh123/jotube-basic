import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TvService } from './tv.service';
import { DatabaseModule } from 'src/core/database/database.module';
import { TvResolver } from './tv.resolver';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [ConfigModule, DatabaseModule, FileModule],
  controllers: [],
  providers: [TvService, TvResolver],
  exports: [TvService],
})
export class TvModule {}
