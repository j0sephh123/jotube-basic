import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { CreatePlaylistDto } from './dtos/create-playlist.dto';
import { UpdatePlaylistDto } from './dtos/update-playlist.dto';
import { UpdateChannelPlaylistDto } from './dtos/update-channel-playlist.dto';
import { PlaylistDetailsResponse } from './dtos/playlist.response';

@Injectable()
export class PlaylistService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(body: CreatePlaylistDto) {
    const playlist = await this.prismaService.playlist.create({
      data: {
        name: body.name,
      },
    });

    return playlist;
  }

  async list() {
    const playlists = await this.prismaService.playlist.findMany({
      orderBy: { createdAt: 'desc' as const },
      include: {
        channels: {
          select: {
            id: true,
            title: true,
            ytId: true,
          },
        },
      },
    });

    return playlists;
  }

  async details(id: number): Promise<PlaylistDetailsResponse> {
    const playlist = await this.prismaService.playlist.findUnique({
      where: { id },
      include: {
        channels: true,
      },
    });

    if (!playlist) {
      throw new Error('Playlist not found');
    }

    const channelsWithCounts = await Promise.all(
      playlist.channels.map(async (channel) => {
        const [
          videoCount,
          savedCount,
          screenshotCount,
          thumbnailCount,
          featuredScreenshots,
        ] = await Promise.all([
          this.prismaService.uploadsVideo.count({
            where: {
              channelId: channel.id,
              artifact: 'VIDEO',
            },
          }),
          this.prismaService.uploadsVideo.count({
            where: {
              channelId: channel.id,
              artifact: 'SAVED',
            },
          }),
          this.prismaService.screenshot.count({
            where: {
              ytChannelId: channel.ytId,
            },
          }),
          this.prismaService.uploadsVideo.count({
            where: {
              channelId: channel.id,
              artifact: 'THUMBNAIL',
            },
          }),
          this.prismaService.channelFeaturedScreenshot.findMany({
            where: {
              channelId: channel.id,
            },
            include: {
              screenshot: true,
            },
          }),
        ]);

        return {
          ...channel,
          featuredScreenshots: featuredScreenshots.map((fs) => ({
            id: fs.screenshot.id,
            second: fs.screenshot.second,
            ytVideoId: fs.screenshot.ytVideoId,
            src: `${fs.screenshot.ytChannelId}/${fs.screenshot.ytVideoId}/saved_screenshots/${fs.screenshot.ytVideoId}-${fs.screenshot.second}.png`,
          })),
          counts: {
            videoCount,
            savedCount,
            screenshotCount,
            thumbnailCount,
          },
        };
      }),
    );

    return {
      id: playlist.id,
      name: playlist.name,
      createdAt: playlist.createdAt.toISOString(),
      updatedAt: playlist.updatedAt.toISOString(),
      channels: channelsWithCounts.map((channel) => ({
        id: channel.id,
        title: channel.title,
        ytId: channel.ytId,
        src: channel.src,
        videoCount: channel.counts.videoCount,
        savedCount: channel.counts.savedCount,
        screenshotCount: channel.counts.screenshotCount,
        thumbnailCount: channel.counts.thumbnailCount,
        featuredScreenshots: channel.featuredScreenshots,
        lastSyncedAt: channel.lastSyncedAt?.toISOString() || null,
      })),
    };
  }

  async update(id: number, body: UpdatePlaylistDto) {
    const playlist = await this.prismaService.playlist.update({
      where: { id },
      data: {
        ...(body.name && { name: body.name }),
      },
    });

    return playlist;
  }

  async delete(id: number) {
    await this.prismaService.$transaction([
      this.prismaService.channel.updateMany({
        where: { playlistId: id },
        data: { playlistId: null },
      }),
      this.prismaService.playlist.delete({
        where: { id },
      }),
    ]);

    return { success: true };
  }

  async updateChannelPlaylist(body: UpdateChannelPlaylistDto) {
    const channel = await this.prismaService.channel.update({
      where: { id: body.channelId },
      data: {
        playlistId: body.playlistId,
      },
    });

    return channel;
  }
}
