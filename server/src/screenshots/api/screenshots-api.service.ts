import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { ScreenshotsManagerService } from 'src/screenshots/manager/screenshots-manager.service';

@Injectable()
export class ScreenshotsApiService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly screenshotsManagerService: ScreenshotsManagerService,
  ) {}

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

  async screenshotsByMonth(month: string) {
    const results = await this.prismaService.$queryRaw<
      Record<string, number>[]
    >`
      SELECT 
        DATE_FORMAT(createdAt, '%Y-%m-%d') as date,
        COUNT(*) as count
      FROM Screenshot
      WHERE DATE_FORMAT(createdAt, '%Y-%m') = ${month}
      GROUP BY DATE_FORMAT(createdAt, '%Y-%m-%d')
      ORDER BY date
    `;

    const countsByDate = {};
    for (const row of results) {
      countsByDate[row.date] = parseInt(row.count.toString());
    }

    return countsByDate;
  }

  async screenshotsByDate(date: string) {
    const results = await this.prismaService.$queryRaw<Record<string, any>[]>`
      SELECT 
        s.*,
        c.title as channelTitle,
        v.title as videoTitle
      FROM Screenshot s
      JOIN Channel c ON s.ytChannelId = c.ytId
      JOIN UploadsVideo v ON s.ytVideoId = v.ytId
      WHERE DATE_FORMAT(s.createdAt, '%Y-%m-%d') = ${date}
      ORDER BY s.createdAt DESC
    `;

    return results;
  }

  async updateScreenshot(id: number, data: { isFav: boolean }) {
    return this.prismaService.screenshot.update({
      where: { id },
      data,
    });
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

  async favoriteScreenshots() {
    const favScreenshots = await this.prismaService.screenshot.findMany({
      where: {
        isFav: true,
      },
    });

    return favScreenshots.map((screenshot) => ({
      src: `http://localhost:3003/images/${screenshot.ytChannelId}/${screenshot.ytVideoId}/saved_screenshots/${screenshot.ytVideoId}-${screenshot.second}.png`,
    }));
  }

  async favoriteCount() {
    const count = await this.prismaService.screenshot.count({
      where: {
        isFav: true,
      },
    });

    return count;
  }

  async getScreenshotsByVideo(ytVideoId: string) {
    const screenshots = await this.prismaService.screenshot.findMany({
      where: {
        ytVideoId,
      },
      orderBy: {
        second: 'asc',
      },
      select: {
        id: true,
        second: true,
        ytChannelId: true,
        ytVideoId: true,
        isFav: true,
      },
    });

    console.log({
      screenshots,
      ytVideoId,
    });

    return screenshots.map((screenshot) => ({
      ...screenshot,
      src: `http://localhost:3003/images/${screenshot.ytChannelId}/${screenshot.ytVideoId}/saved_screenshots/${screenshot.ytVideoId}-${screenshot.second}.png`,
    }));
  }
}
