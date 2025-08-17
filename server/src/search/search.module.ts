import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchResolver } from './search.resolver';
import { PrismaService } from '../core/database/prisma/prisma.service';

@Module({
  controllers: [SearchController],
  providers: [SearchResolver, PrismaService],
})
export class SearchModule {}
