import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [FileModule],
  controllers: [ImagesController],
  providers: [PrismaService],
})
export class ImagesModule {}
