import { Injectable } from '@nestjs/common';
import { ArtifactType, UploadsVideo } from '@prisma/client';
import { spawn } from 'child_process';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { UploadWithStoryboardResponse } from './dtos/upload-with-storyboard.response';

interface VideoInfoResponse {
  success: boolean;
  data?: {
    fragments: number;
    url: string;
  };
  error?: string;
}

@Injectable()
export class StoryboardService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(upload: UploadsVideo) {
    const existingStoryboard = await this.prismaService.storyboard.findUnique({
      where: {
        uploadsVideoId: upload.id,
      },
    });

    if (existingStoryboard) {
      return existingStoryboard;
    }

    const info = await this.getVideoInfo(upload.ytId);

    if (info.success && info.data) {
      const storyboard = await this.prismaService.storyboard.create({
        data: {
          uploadsVideoId: upload.id,
          fragments: info.data.fragments,
          url: info.data.url,
        },
      });

      return storyboard;
    } else {
      throw new Error(
        `Failed to create storyboard: ${info.error || 'Unknown error'}`,
      );
    }
  }

  async getVideoInfo(ytVideoId: string): Promise<VideoInfoResponse> {
    return new Promise(async (resolve) => {
      const ytDlp = spawn('yt-dlp', [
        '-j',
        `https://www.youtube.com/watch?v=${ytVideoId}`,
      ]);

      let output = '';
      let errorOutput = '';

      ytDlp.stdout.on('data', (data) => {
        output += data.toString();
      });

      ytDlp.stderr.on('data', (data) => {
        errorOutput += data.toString();
      });

      ytDlp.on('close', async (code) => {
        if (code === 0) {
          console.log('yt-dlp response:', output);

          try {
            const response = JSON.parse(output);

            if (!Array.isArray(response.formats)) {
              resolve({ success: false, error: 'Response is not an array' });
              return;
            }

            const sb1Format = response.formats.find(
              (item) => item.format_id === 'sb1',
            );

            if (!sb1Format) {
              resolve({ success: false, error: 'sb1 format not found' });
              return;
            }

            if (!Array.isArray(sb1Format.fragments)) {
              resolve({
                success: false,
                error: 'fragments field is not an array',
              });
              return;
            }

            const fragments: number = sb1Format.fragments.length;
            const url: string = sb1Format.url;

            resolve({
              success: true,
              data: { fragments, url },
            });
          } catch (error) {
            console.error('Error parsing response:', error);
            resolve({ success: false, error: 'Failed to parse response' });
          }
        } else {
          console.error('yt-dlp error:', errorOutput);
          resolve({ success: false, error: errorOutput });
        }
      });

      ytDlp.on('error', (error) => {
        console.error('yt-dlp spawn error:', error);
        resolve({ success: false, error: error.message });
      });
    });
  }

  async getUploadsWithStoryboards(
    ytChannelId: string,
  ): Promise<UploadWithStoryboardResponse[]> {
    const uploads = await this.prismaService.uploadsVideo.findMany({
      where: {
        channel: {
          ytId: ytChannelId,
        },
        artifact: ArtifactType.STORYBOARD,
      },
      select: {
        id: true,
        ytId: true,
        title: true,
        src: true,
        publishedAt: true,
        channelId: true,
        nextPageToken: true,
        duration: true,
        artifact: true,
        storyboard: {
          select: {
            id: true,
            fragments: true,
            url: true,
          },
        },
        channel: {
          select: {
            id: true,
            title: true,
            src: true,
            ytId: true,
          },
        },
      },
    });

    return uploads.map((upload) => ({
      id: upload.id,
      ytId: upload.ytId,
      title: upload.title,
      src: upload.src,
      publishedAt: upload.publishedAt,
      channelId: upload.channelId,
      nextPageToken: upload.nextPageToken,
      duration: upload.duration,
      artifact: upload.artifact,
      storyboard: {
        id: upload.storyboard.id,
        fragments: upload.storyboard.fragments,
        url: upload.storyboard.url,
      },
      channel: {
        id: upload.channel.id,
        title: upload.channel.title,
        src: upload.channel.src,
        ytId: upload.channel.ytId,
      },
    }));
  }
}
