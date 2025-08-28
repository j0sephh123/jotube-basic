import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/core/database/prisma/prisma.service';

type QueueItem = {
  latestScreenshot: null;
  progress: string | number;
  status: string;
  totalSeconds: number;
  ytChannelId: string;
  ytVideoId: string;
};

type DownloadQueueItem = {
  ytChannelId: string;
  ytVideoId: string;
  videoTitle: string;
  channelTitle: string;
  isDownloading: boolean;
  downloadProgress: string;
};

type DownloadQueueByChannel = Record<string, DownloadQueueItem[]>;

type AddToQueueRequest = {
  ytChannelId: string;
  ytVideoId: string;
};

@Injectable()
export class YouTubeDownloaderService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  private async httpGetJsonWithRetry<T>(
    url: string,
    opts?: { timeoutMs?: number; retries?: number; baseDelayMs?: number },
  ): Promise<T> {
    const timeoutMs =
      opts?.timeoutMs ??
      Number(this.configService.get('DL_FETCH_TIMEOUT_MS') ?? 10000);
    const retries = opts?.retries ?? 2; // total attempts = retries + 1
    const baseDelay = opts?.baseDelayMs ?? 300;

    let attempt = 0;
    // simple bounded retry with expo backoff + jitter
    // NOTE: Node 18+ supports AbortSignal.timeout
    while (true) {
      attempt++;
      const controller = AbortSignal.timeout(timeoutMs);
      try {
        const res = await fetch(url, { signal: controller });
        if (!res.ok) {
          // treat 5xx as retryable, 4xx as non-retryable
          if (res.status >= 500 && attempt <= retries + 1) {
            throw new Error(`Retryable status ${res.status}`);
          }
          // Non-retryable: throw HttpException so controller can map to 502/504
          const text = await res.text().catch(() => '');
          throw new HttpException(
            `Upstream responded ${res.status}: ${text?.slice(0, 200)}`,
            res.status === 404 ? HttpStatus.NOT_FOUND : HttpStatus.BAD_GATEWAY,
          );
        }
        // JSON parse may throw
        const data = (await res.json()) as T;
        return data;
      } catch (err: any) {
        const isAbort =
          err?.name === 'TimeoutError' ||
          /aborted|Timeout/i.test(String(err?.message));
        const isRetryable =
          isAbort ||
          /Retryable status/.test(String(err?.message)) ||
          /ECONNRESET|ECONNREFUSED|EAI_AGAIN|ENOTFOUND|socket hang up/i.test(
            String(err?.message),
          );

        if (attempt <= retries + 1 && isRetryable) {
          const delay =
            baseDelay * 2 ** (attempt - 1) + Math.floor(Math.random() * 100);
          await new Promise((r) => setTimeout(r, delay));
          continue;
        }

        // Convert to a clean upstream error for the controller layer
        if (isAbort) {
          throw new HttpException(
            'Upstream timeout',
            HttpStatus.GATEWAY_TIMEOUT,
          );
        }
        // last resort
        throw new HttpException(
          'Upstream fetch failed',
          HttpStatus.BAD_GATEWAY,
        );
      }
    }
  }

  async getDownloadQueue(): Promise<DownloadQueueByChannel> {
    const base = this.configService.get<string>('DL_SERVICE_URL');
    if (!base) {
      // Misconfiguration should surface clearly but not crash the process
      throw new HttpException(
        'DL_SERVICE_URL not configured',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // 1) Call the Python service with timeout + retries
    const queueUrl = base.replace(/\/+$/, '') + '/queue';

    let result: QueueItem[] = [];
    try {
      result = await this.httpGetJsonWithRetry<QueueItem[]>(queueUrl, {
        timeoutMs: Number(
          this.configService.get('DL_FETCH_TIMEOUT_MS') ?? 10000,
        ),
      });
    } catch (e) {
      // If your UX tolerates degraded mode: return empty object instead of throwing.
      // return {};
      // If you prefer explicit failure to callers:
      throw e;
    }

    if (!Array.isArray(result) || result.length === 0) {
      return {};
    }

    // 2) Batch DB lookup instead of N+1
    const videoIds = Array.from(
      new Set(result.map((r) => r.ytVideoId).filter(Boolean)),
    );

    const dbVideos = await this.prismaService.uploadsVideo.findMany({
      where: { ytId: { in: videoIds } },
      include: {
        channel: {
          select: { ytId: true, title: true },
        },
      },
    });

    // index by ytId for O(1) lookup
    const byYtId = new Map(dbVideos.map((v) => [v.ytId, v]));

    // 3) Reduce with defensive null checks
    const grouped: DownloadQueueByChannel = {};
    for (const item of result) {
      const dbItem = byYtId.get(item.ytVideoId);
      if (!dbItem || !dbItem.channel) {
        // Unknown to DB → skip quietly (or log)
        continue;
      }

      const downloadItem: DownloadQueueItem = {
        ytChannelId: dbItem.channel.ytId,
        ytVideoId: item.ytVideoId,
        videoTitle: dbItem.title,
        channelTitle: dbItem.channel.title,
        isDownloading: item.status === 'downloading',
        downloadProgress: String(item.progress ?? ''),
      };

      const key = dbItem.channel.ytId;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(downloadItem);
    }

    return grouped;
  }

  async addToQueue({ ytChannelId, ytVideoId }: AddToQueueRequest) {
    const base = this.configService.get<string>('DL_SERVICE_URL');
    if (!base) {
      throw new HttpException(
        'DL_SERVICE_URL not configured',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const url = base.replace(/\/+$/, '') + '/add-to-queue';

    const timeoutMs = Number(
      this.configService.get('DL_FETCH_TIMEOUT_MS') ?? 10000,
    );
    const controller = AbortSignal.timeout(timeoutMs);

    let res: Response;
    try {
      res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ytChannelId, ytVideoId }),
        signal: controller,
      });
    } catch (err: any) {
      const isAbort =
        err?.name === 'TimeoutError' ||
        /aborted|Timeout/i.test(String(err?.message));
      if (isAbort)
        throw new HttpException('Upstream timeout', HttpStatus.GATEWAY_TIMEOUT);
      throw new HttpException('Upstream fetch failed', HttpStatus.BAD_GATEWAY);
    }

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new HttpException(
        `Failed to add to queue: ${res.status} ${text?.slice(0, 200)}`,
        res.status >= 500 ? HttpStatus.BAD_GATEWAY : HttpStatus.BAD_REQUEST,
      );
    }

    try {
      return await res.json();
    } catch {
      throw new HttpException(
        'Invalid JSON from upstream',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
