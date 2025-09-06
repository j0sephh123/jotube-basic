import { Resolver, Query } from '@nestjs/graphql';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { StatisticsCountsResponse } from './dtos/statistics.response';

@Resolver()
export class StatisticsResolver {
  constructor(private readonly prismaService: PrismaService) {}

  @Query(() => StatisticsCountsResponse, { name: 'statisticsCounts' })
  async getCounts(): Promise<StatisticsCountsResponse> {
    const [totalScreenshots, totalThumbnails, totalSaved, totalStoryboards] =
      await Promise.all([
        this.prismaService.screenshot.count(),
        this.prismaService.thumbnail.count(),
        this.prismaService.uploadsVideo.count({
          where: {
            artifact: 'SAVED',
          },
        }),
        this.prismaService.uploadsVideo.count({
          where: {
            artifact: 'STORYBOARD',
          },
        }),
      ]);

    return {
      totalScreenshots,
      totalThumbnails,
      totalSaved,
      totalStoryboards,
    };
  }
}
