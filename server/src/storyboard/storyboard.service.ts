import { Injectable } from '@nestjs/common';
import { UploadsVideo, ArtifactType } from '@prisma/client';
import { PrismaService } from 'src/core/database/prisma/prisma.service';

@Injectable()
export class StoryboardService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(upload: UploadsVideo) {
    const updatedUpload = await this.prismaService.uploadsVideo.update({
      where: { id: upload.id },
      data: { artifact: ArtifactType.STORYBOARD },
    });

    return updatedUpload;
  }
}
