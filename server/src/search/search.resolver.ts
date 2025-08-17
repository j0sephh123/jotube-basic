import { Resolver, Query, Args } from '@nestjs/graphql';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { YT_CHANNEL_ID_LENGTH, YT_VIDEO_ID_LENGTH } from 'src/shared/constants';
import { SearchVideoResult, SearchChannelResult } from './dtos/search.response';
import { SearchInput } from './dtos/search.input';

@Resolver()
export class SearchResolver {
  constructor(private readonly prismaService: PrismaService) {}

  @Query(() => [SearchVideoResult])
  async searchVideos(
    @Args('searchInput') { search }: SearchInput,
  ): Promise<SearchVideoResult[]> {
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

      return upload
        ? [
            {
              title: upload.title,
              ytId: upload.ytId,
              src: upload.src,
              channelYtId: upload.channel.ytId,
              type: 'ytVideoId',
            },
          ]
        : [];
    }

    return [];
  }

  @Query(() => [SearchChannelResult])
  async searchChannels(
    @Args('searchInput') { search }: SearchInput,
  ): Promise<SearchChannelResult[]> {
    if (search.length === YT_CHANNEL_ID_LENGTH) {
      const channel = await this.prismaService.channel.findUnique({
        where: { ytId: search },
        select: {
          title: true,
          ytId: true,
          src: true,
        },
      });

      return channel
        ? [
            {
              title: channel.title,
              ytId: channel.ytId,
              src: channel.src,
              type: 'ytChannelId',
            },
          ]
        : [];
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

    return result.map((item) => ({
      title: item.title,
      ytId: item.ytId,
      src: item.src,
      type: 'channelTitle',
    }));
  }
}
