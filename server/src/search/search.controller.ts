import { Body, Controller, Post } from '@nestjs/common';
import { QuickSearchDto, QuickSearchResult } from 'src/search/dtos/search.dto';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { YT_CHANNEL_ID_LENGTH, YT_VIDEO_ID_LENGTH } from 'src/shared/constants';

@Controller('search')
export class SearchController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post('')
  async search(
    @Body() { search }: QuickSearchDto,
  ): Promise<QuickSearchResult[]> {
    if (search.length === YT_VIDEO_ID_LENGTH) {
      const upload = await this.prismaService.uploadsVideo.findUnique({
        where: { ytId: search },
        select: {
          title: true,
          ytId: true,
          src: true,
          channel: {
            select: {
              ytId: true,
            },
          },
        },
      });

      return upload ? [{ ...upload, type: 'ytVideoId' }] : [];
    }

    if (search.length === YT_CHANNEL_ID_LENGTH) {
      const channel = await this.prismaService.channel.findUnique({
        where: { ytId: search },
        select: {
          title: true,
          ytId: true,
          src: true,
        },
      });

      return channel ? [{ ...channel, type: 'ytChannelId' }] : [];
    }

    const result = await this.prismaService.channel.findMany({
      where: {
        title: {
          contains: search,
        },
      },
      select: {
        title: true,
        ytId: true,
        src: true,
      },
    });

    return result.map((item) => ({ ...item, type: 'channelTitle' }));
  }
}
