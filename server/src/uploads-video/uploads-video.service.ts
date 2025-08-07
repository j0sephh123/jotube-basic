import { Injectable } from '@nestjs/common';
import { FinishProcessUploadDto } from 'src/uploads-video/dtos/finish-process-upload.dto';
import { saveUploadDto } from 'src/uploads-video/dtos/save-upload.dto';
import { deleteUploadsDto } from 'src/uploads-video/dtos/delete-uploads.dto';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { ThumbnailsManagerService } from 'src/thumbnails/manager/thumbnails-manager.service';
import { ScreenshotsManagerService } from 'src/screenshots/manager/screenshots-manager.service';
import { FilePathService } from 'src/file/file-path.service';
import { videoExtensions } from 'src/shared/constants';
import { FileOperationService } from 'src/file/file-operation.service';
import { DirectoryService } from 'src/file/directory.service';
import { YoutubeService } from 'src/core/external-services/youtube-api/youtube.service';
import { fetchUploadsDto } from 'src/uploads-video/dtos/fetch-uploads.dto';
import { syncUploadsDto } from 'src/uploads-video/dtos/sync-uploads.dto';
import { savedUploadsDto } from 'src/uploads-video/dtos/saved-uploads.dto';
import { cleanShortUploadsDto } from 'src/uploads-video/dtos/clean-short-uploads.dto';
import { ArtifactType } from '@prisma/client';

@Injectable()
export class UploadsVideoService {
  constructor(
    private readonly directoryService: DirectoryService,
    private readonly thumbnailsManagerService: ThumbnailsManagerService,
    private readonly screenshotsManagerService: ScreenshotsManagerService,
    private readonly filePathService: FilePathService,
    private readonly fileOperationService: FileOperationService,
    private readonly youtubeService: YoutubeService,
    private prismaService: PrismaService,
  ) {}

  public async uploadsList(ytChannelId: string, sortOrder: 'asc' | 'desc') {
    const channel = await this.prismaService.channel.findUnique({
      where: {
        ytId: ytChannelId,
      },
      include: {
        uploads: {
          where: {
            artifact: ArtifactType.VIDEO,
          },
          orderBy: {
            publishedAt: sortOrder,
          },
          take: 50,
        },
      },
    });

    return channel;
  }

  public async storyboards(ytChannelId: string) {
    const channel = await this.prismaService.channel.findUnique({
      where: {
        ytId: ytChannelId,
      },
    });

    if (!channel) {
      throw new Error('Channel not found');
    }

    const storyboards = await this.prismaService.uploadsVideo.findMany({
      where: {
        channelId: channel.id,
        artifact: ArtifactType.STORYBOARD,
      },
      orderBy: {
        publishedAt: 'desc',
      },
    });

    return storyboards;
  }

  async saveUpload({ uploads }: saveUploadDto) {
    const results = await Promise.all(
      uploads.map(async ({ ytVideoId }) => {
        const upload = await this.prismaService.uploadsVideo.update({
          where: { ytId: ytVideoId },
          data: { artifact: 'SAVED' },
        });

        await this.prismaService.channel.findUnique({
          where: { id: upload.channelId },
        });

        return upload;
      }),
    );

    return results;
  }

  async finishProcessingUpload({
    savedSeconds,
    ytChannelId,
    ytVideoId,
  }: FinishProcessUploadDto) {
    const result = await this.prismaService.uploadsVideo.findFirst({
      where: {
        ytId: ytVideoId,
      },
    });

    if (!result) {
      throw new Error('Upload not found');
    }

    try {
      const thumbnail = await this.prismaService.thumbnail.findUnique({
        where: {
          uploadsVideoId: result.id,
        },
      });

      if (thumbnail) {
        await this.prismaService.thumbnail.delete({
          where: {
            id: thumbnail.id,
          },
        });
      }
    } catch (e) {
      console.error('Error deleting thumbnail:', e);
    }

    if (savedSeconds.length === 0) {
      await this.directoryService.deleteVideoDirectory(ytChannelId, ytVideoId);
      await this.prismaService.uploadsVideo.delete({
        where: {
          ytId: ytVideoId,
        },
      });
    } else {
      await this.screenshotsManagerService.processScreenshotsForUpload(
        ytChannelId,
        ytVideoId,
        savedSeconds,
      );
      await this.deleteDownloadedVideo({
        ytChannelId: ytChannelId,
        ytVideoId: ytVideoId,
      });

      await this.thumbnailsManagerService.deleteThumbnail(
        ytChannelId,
        ytVideoId,
      );

      await Promise.all(
        savedSeconds.map((second) =>
          this.prismaService.screenshot.create({
            data: {
              second,
              ytChannelId,
              ytVideoId,
            },
          }),
        ),
      );
    }

    return result;
  }

  async deleteUploads({ ytChannelId, ytVideoIds }: deleteUploadsDto) {
    if (ytVideoIds.length === 0) {
      const channel = await this.prismaService.channel.findUnique({
        where: { ytId: ytChannelId },
        select: {
          id: true,
          uploads: {
            where: { artifact: { in: ['SAVED', 'DOWNLOADED'] } },
            select: {
              ytId: true,
              id: true,
            },
          },
        },
      });

      if (channel) {
        await this.prismaService.uploadsVideo.deleteMany({
          where: {
            channelId: channel.id,
            ytId: { in: channel.uploads.map((upload) => upload.ytId) },
          },
        });
      }

      return { success: true };
    }

    for (const ytVideoId of ytVideoIds) {
      await this.prismaService.uploadsVideo.delete({
        where: {
          ytId: ytVideoId,
        },
      });

      this.directoryService.deleteDirSync({
        ytChannelId,
        ytVideoId,
      });
    }

    return { success: true };
  }

  async fetchUploads({ ytChannelId }: fetchUploadsDto) {
    const channel = await this.prismaService.channel.findUnique({
      where: { ytId: ytChannelId },
      select: {
        uploads: {
          orderBy: { publishedAt: 'asc' },
          take: 1,
          select: { nextPageToken: true },
        },
        fetchedUntilEnd: true,
        id: true,
        title: true,
      },
    });

    if (!channel) {
      throw new Error('Channel not found');
    }

    const { fetchedUntilEnd, id } = channel;

    if (fetchedUntilEnd) {
      throw new Error('we are done. no more uploads to fetch');
    }

    const data = await this.youtubeService.fetchUploadsForChannel(
      ytChannelId,
      id,
    );

    await this.prismaService.channel.update({
      where: { id },
      data: { fetchedUntilEnd: true },
    });

    const result = await this.prismaService.uploadsVideo.createMany({
      data,
    });

    await this.prismaService.channel.update({
      where: { id },
      data: { lastSyncedAt: new Date() },
    });

    return result;
  }

  async syncUploads({ channelId, ytChannelId }: syncUploadsDto) {
    const channel = await this.prismaService.channel.findUnique({
      where: { ytId: ytChannelId },
      select: { id: true, title: true },
    });

    if (!channel) throw new Error('Channel not found');

    const getLatestSaved = async () => {
      const [latestSaved] = await this.prismaService.uploadsVideo.findMany({
        where: { channelId },
        take: 1,
        orderBy: { publishedAt: 'desc' },
        select: { ytId: true, publishedAt: true },
      });

      if (!latestSaved) return null;

      return {
        ...latestSaved,
        publishedAtDate: new Date(latestSaved.publishedAt),
      };
    };

    const getLatestFetched = async () => {
      const channel = await this.prismaService.channel.findUnique({
        where: { ytId: ytChannelId },
      });

      if (!channel) throw new Error('Channel not found');

      const fetchStartVideo = await this.prismaService.uploadsVideo.findUnique({
        where: { ytId: channel.fetchStartVideoId },
        select: { ytId: true, publishedAt: true },
      });

      if (!fetchStartVideo) return null;

      return {
        ...fetchStartVideo,
        publishedAtDate: new Date(fetchStartVideo.publishedAt),
      };
    };

    const lastSaved = await getLatestSaved();
    const latestFetched = await getLatestFetched();

    let latestUpload;
    if (!lastSaved && !latestFetched) {
      latestUpload = null;
    } else if (!lastSaved) {
      latestUpload = latestFetched;
    } else if (!latestFetched) {
      latestUpload = lastSaved;
    } else {
      latestUpload =
        lastSaved.publishedAtDate > latestFetched.publishedAtDate
          ? lastSaved
          : latestFetched;
    }

    if (!latestUpload) {
      return { count: 0 };
    }

    const syncedUploads = await this.youtubeService.syncUploads(
      ytChannelId,
      latestUpload.ytId,
      channelId,
    );

    if (syncedUploads[0]) {
      await this.prismaService.channel.update({
        where: { ytId: ytChannelId },
        data: { fetchStartVideoId: syncedUploads[0].ytId },
      });
    }

    const existingUploads = await this.prismaService.uploadsVideo.findMany({
      where: {
        ytId: { in: syncedUploads.map((upload) => upload.ytId) },
      },
      select: { ytId: true },
    });

    const existingIds = new Set(existingUploads.map((x) => x.ytId));
    const newUploads = syncedUploads.filter((u) => !existingIds.has(u.ytId));

    let result = { count: 0 };
    if (newUploads.length > 0) {
      result = await this.prismaService.uploadsVideo.createMany({
        data: newUploads,
      });
    }

    await this.prismaService.channel.update({
      where: { ytId: ytChannelId },
      data: { lastSyncedAt: new Date() },
    });

    return result;
  }

  async savedUploads({ ytChannelIds }: savedUploadsDto) {
    const channelPromises = ytChannelIds.map(async (ytChannelId) => {
      const channel = await this.prismaService.channel.findUnique({
        where: { ytId: ytChannelId },
        select: {
          id: true,
          title: true,
          src: true,
          ytId: true,
          uploads: {
            where: { artifact: { in: ['SAVED', 'DOWNLOADED'] } },
            select: {
              createdAt: true,
              ytId: true,
              id: true,
              duration: true,
              publishedAt: true,
              src: true,
              title: true,
              artifact: true,
            },
          },
        },
      });

      if (!channel) {
        return {
          ytChannelId,
          channel: null,
          uploads: [],
          totalUploads: 0,
        };
      }

      const uploads = channel.uploads;

      return {
        ytChannelId,
        channel,
        uploads,
        totalUploads: channel.uploads.length,
      };
    });

    const results = await Promise.all(channelPromises);

    return results;
  }

  private async deleteDownloadedVideo({
    ytChannelId,
    ytVideoId,
  }: {
    ytChannelId: string;
    ytVideoId: string;
  }) {
    const basePath = this.filePathService.getBasePath();
    const videoDirectoryPath = `${basePath}/${ytChannelId}/${ytVideoId}`;

    try {
      const files =
        await this.fileOperationService.listFiles(videoDirectoryPath);

      const videoFiles = files.filter((file) =>
        videoExtensions.some((ext) => file.toLowerCase().endsWith(`.${ext}`)),
      );

      for (const file of videoFiles) {
        const filePath = `${videoDirectoryPath}/${file}`;
        await this.fileOperationService.fileExists(filePath);
        await this.fileOperationService.deleteFile(filePath);
      }
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  }

  async cleanShortUploads({ ytChannelId }: cleanShortUploadsDto) {
    const channel = await this.prismaService.channel.findUnique({
      where: { ytId: ytChannelId },
      select: {
        uploads: {
          where: { artifact: ArtifactType.VIDEO },
        },
      },
    });

    if (!channel) {
      throw new Error('Channel not found');
    }

    const videoIds = channel.uploads.map((upload) => upload.ytId);
    const durations = await this.youtubeService.getVideoDurations(videoIds);

    const shortVideoIds = durations
      .filter((duration) => duration.duration < 180)
      .map((duration) => duration.id);

    if (shortVideoIds.length > 0) {
      await this.prismaService.uploadsVideo.deleteMany({
        where: {
          ytId: { in: shortVideoIds },
        },
      });
    }

    return {
      deletedCount: shortVideoIds.length,
    };
  }
}
