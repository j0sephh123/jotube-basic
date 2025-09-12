import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import {
  CreateTvInput,
  UpdateTvInput,
  TvMessage,
  ExtendedTv,
  CreateEpisodesFromPathResponse,
} from './dtos';
import { FolderService } from 'src/file/folder.service';
import { FolderScannerService } from 'src/folder-scanner/folder-scanner.service';
import { EpisodeService } from 'src/episode/episode.service';
import { randomUUID } from 'crypto';

@Injectable()
export class TvService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly folderService: FolderService,
    private readonly folderScannerService: FolderScannerService,
    private readonly episodeService: EpisodeService,
  ) {}

  async create({ title, duration }: CreateTvInput) {
    try {
      const identifier = randomUUID();

      const tv = await this.prismaService.tV.create({
        data: {
          identifier,
          title,
          duration,
        },
      });

      await this.folderService.createTvFolder(identifier);

      return {
        tv,
        message: TvMessage.CREATED_SUCCESSFULLY,
      };
    } catch {
      return {
        tv: null,
        message: TvMessage.FAILED_TO_CREATE,
      };
    }
  }

  async findAll(): Promise<ExtendedTv[]> {
    const tvs = await this.prismaService.tV.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        _count: {
          select: {
            episodes: true,
          },
        },
      },
    });

    return tvs.map((tv) => ({
      ...tv,
      amountOfEpisodes: tv._count.episodes,
    }));
  }

  async findOne(id: number) {
    return this.prismaService.tV.findUnique({
      where: { id },
    });
  }

  async update(id: number, { title, duration }: UpdateTvInput) {
    try {
      const tv = await this.prismaService.tV.update({
        where: { id },
        data: {
          title,
          duration,
        },
      });

      return {
        tv,
        message: TvMessage.UPDATED_SUCCESSFULLY,
      };
    } catch {
      return {
        tv: null,
        message: TvMessage.FAILED_TO_UPDATE,
      };
    }
  }

  async delete(id: number) {
    try {
      const tv = await this.prismaService.tV.findUnique({
        where: { id },
        select: { identifier: true },
      });

      if (tv) {
        await this.folderService.deleteTvFolder(tv.identifier);
      }

      await this.prismaService.tV.delete({
        where: { id },
      });

      return { success: true, message: 'TV deleted successfully' };
    } catch {
      return { success: false, message: 'Failed to delete TV' };
    }
  }

  async createEpisodesFromPath(
    tvId: number,
    path: string,
    structure: string,
    ignoreDirs: string[],
  ): Promise<CreateEpisodesFromPathResponse> {
    try {
      const scanResult = await this.folderScannerService.scanFolder({
        path,
        structure,
        ignoreDirs,
      });

      let episodesCreated = 0;

      for (const fileInfo of scanResult.files) {
        const episodeResult = await this.episodeService.create({
          title: fileInfo.fileName,
          tvId,
        });

        await this.prismaService.videoFile.create({
          data: {
            fileName: fileInfo.fileName,
            size: fileInfo.size,
            duration: fileInfo.duration,
            format: fileInfo.format,
            episodeId: episodeResult.episode.id,
          },
        });
        episodesCreated++;
      }

      return {
        episodesCreated,
        message: `Successfully created ${episodesCreated} episodes`,
      };
    } catch (error) {
      return {
        episodesCreated: 0,
        message: `Failed to demo TV: ${error.message}`,
      };
    }
  }
}
