import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { ScreenshotsManagerService } from 'src/screenshots/manager/screenshots-manager.service';
import { GetScreenshotsInput } from 'src/thumbnails/dtos/get-screenshots.input';

type Item = {
  id: number;
  second: number;
  ytChannelId: string;
  ytVideoId: string;
};

@Injectable()
export class ScreenshotsApiService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly screenshotsManagerService: ScreenshotsManagerService,
  ) {}

  public async getScreenshots({ channelIds }: GetScreenshotsInput) {
    if (channelIds.length === 0) {
      return this.getAllChannelsScreenshots();
    }

    const screenshotsPromises = channelIds.map((channelId) =>
      this.getScreenshotsForChannel(channelId),
    );

    const channelScreenshots = await Promise.all(screenshotsPromises);

    return channelScreenshots.flat();
  }

  private async getScreenshotsForChannel(channelId: number) {
    const randomScreenshots = await this.prismaService.$queryRaw<Item[]>`
          SELECT s.* FROM Screenshot s
          INNER JOIN Channel c ON s.ytChannelId = c.ytId
          WHERE c.id = ${channelId}
          ORDER BY RAND() 
          -- LIMIT 50
        `;

    return this.mapToScreenshots(randomScreenshots);
  }

  private async getAllChannelsScreenshots() {
    const randomScreenshots = await this.prismaService.$queryRaw<Item[]>`
      SELECT * FROM Screenshot 
      ORDER BY RAND() 
      -- LIMIT 50
    `;

    return this.mapToScreenshots(randomScreenshots);
  }

  private mapToScreenshots(screenshots: Item[]) {
    return screenshots.map(({ id, second, ytChannelId, ytVideoId }) => ({
      ytVideoId,
      id,
      second,
      src: `http://localhost:3003/images/${ytChannelId}/${ytVideoId}/saved_screenshots/${ytVideoId}-${second}.png`,
    }));
  }

  async screenshots() {
    const results = await this.prismaService.$queryRaw<
      Record<string, number>[]
    >`
      SELECT 
        DATE_FORMAT(createdAt, '%Y-%m') as month,
        COUNT(*) as count
      FROM Screenshot
      GROUP BY DATE_FORMAT(createdAt, '%Y-%m')
      ORDER BY month
    `;

    const countsByMonth = {};
    for (const row of results) {
      countsByMonth[row.month] = parseInt(row.count.toString());
    }

    return countsByMonth;
  }

  async toggleFeaturedScreenshot(id: number) {
    const screenshot = await this.prismaService.screenshot.findUnique({
      where: { id },
      include: {
        featuredLinks: {
          include: {
            screenshot: true,
          },
        },
      },
    });

    if (!screenshot) {
      throw new Error('Screenshot not found');
    }

    const channel = await this.prismaService.channel.findUnique({
      where: { ytId: screenshot.ytChannelId },
    });

    if (!channel) {
      throw new Error('Channel not found');
    }

    const existingFeaturedLink =
      await this.prismaService.channelFeaturedScreenshot.findUnique({
        where: {
          channelId_screenshotId: {
            channelId: channel.id,
            screenshotId: id,
          },
        },
      });

    if (existingFeaturedLink) {
      await this.prismaService.channelFeaturedScreenshot.delete({
        where: {
          channelId_screenshotId: {
            channelId: channel.id,
            screenshotId: id,
          },
        },
      });
      return { featured: false };
    } else {
      await this.prismaService.channelFeaturedScreenshot.create({
        data: {
          channelId: channel.id,
          screenshotId: id,
        },
      });
      return { featured: true };
    }
  }

  async deleteScreenshot(id: number) {
    const screenshot = await this.prismaService.screenshot.findUnique({
      where: { id },
    });

    if (!screenshot) {
      throw new Error('Screenshot not found');
    }

    this.screenshotsManagerService.deleteScreenshot(
      screenshot.ytChannelId,
      screenshot.ytVideoId,
      screenshot.second,
    );

    return this.prismaService.screenshot.delete({
      where: { id },
    });
  }

  async getVideoScreenshotCounts(channelId: number) {
    const channel = await this.prismaService.channel.findUnique({
      where: { id: channelId },
    });

    const results = await this.prismaService.$queryRaw<
      { ytVideoId: string; screenshotCount: bigint; dateAdded: Date }[]
    >`
      SELECT 
        ytVideoId,
        COUNT(*) as screenshotCount,
        MIN(createdAt) as dateAdded
      FROM Screenshot
      WHERE ytChannelId = ${channel.ytId}
      GROUP BY ytVideoId
      ORDER BY screenshotCount DESC
    `;

    return results.map((result) => ({
      ytVideoId: result.ytVideoId,
      screenshotCount: Number(result.screenshotCount),
      dateAdded: result.dateAdded,
    }));
  }
}
