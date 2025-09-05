import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { CreateEpisodeInput, UpdateEpisodeInput, EpisodeMessage } from './dtos';
import { FolderService } from 'src/file/folder.service';
import { randomUUID } from 'crypto';

@Injectable()
export class EpisodeService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly folderService: FolderService,
  ) {}

  async create({ title, publishedAt, tvId }: CreateEpisodeInput) {
    try {
      const identifier = randomUUID();

      const episode = await this.prismaService.episode.create({
        data: {
          identifier,
          title,
          artifact: 'default',
          publishedAt,
          tvId,
        },
      });

      const tv = await this.prismaService.tV.findUnique({
        where: { id: tvId },
        select: { identifier: true },
      });

      if (tv) {
        await this.folderService.createEpisodeFolder(tv.identifier, identifier);
      }

      return {
        episode,
        message: EpisodeMessage.CREATED_SUCCESSFULLY,
      };
    } catch {
      return {
        episode: null,
        message: EpisodeMessage.FAILED_TO_CREATE,
      };
    }
  }

  async findAll() {
    return this.prismaService.episode.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        tv: true,
      },
    });
  }

  async findByTvId(tvId: number) {
    return this.prismaService.episode.findMany({
      where: { tvId },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        tv: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prismaService.episode.findUnique({
      where: { id },
      include: {
        tv: true,
      },
    });
  }

  async update(id: number, { title, publishedAt }: UpdateEpisodeInput) {
    try {
      const episode = await this.prismaService.episode.update({
        where: { id },
        data: {
          title,
          publishedAt,
        },
        include: {
          tv: true,
        },
      });

      return {
        episode,
        message: EpisodeMessage.UPDATED_SUCCESSFULLY,
      };
    } catch {
      return {
        episode: null,
        message: EpisodeMessage.FAILED_TO_UPDATE,
      };
    }
  }

  async delete(id: number) {
    try {
      const episode = await this.prismaService.episode.findUnique({
        where: { id },
        include: {
          tv: true,
        },
      });

      if (episode) {
        await this.folderService.deleteEpisodeFolder(
          episode.tv.identifier,
          episode.identifier,
        );
      }

      await this.prismaService.episode.delete({
        where: { id },
      });

      return { success: true, message: 'Episode deleted successfully' };
    } catch {
      return { success: false, message: 'Failed to delete episode' };
    }
  }
}
