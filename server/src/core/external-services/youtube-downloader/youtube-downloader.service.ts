import { Injectable } from '@nestjs/common';
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

/**
 * Flattened result type to avoid downstream narrowing errors.
 * You can read `result.reason` safely without a type guard.
 */
type AddToQueueResult = {
  ok: boolean;
  data?: unknown;
  reason?:
    | 'MISCONFIG'
    | 'NETWORK'
    | 'UPSTREAM_4XX'
    | 'UPSTREAM_5XX'
    | 'BAD_JSON'
    | `UPSTREAM_${number}`;
};

/**
 * Downloader service — Option A (degrade gracefully).
 * Never throws due to upstream issues; returns safe fallbacks.
 */
@Injectable()
export class YouTubeDownloaderService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * GET JSON with retry and timeout.
   * Throws plain Error strings only; callers swallow and degrade.
   */
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

    while (true) {
      attempt++;
      const controller = AbortSignal.timeout(timeoutMs);

      try {
        const res = await fetch(url, { signal: controller });

        if (!res.ok) {
          if (res.status >= 500 && attempt <= retries) {
            throw new Error(`RETRYABLE_${res.status}`);
          }
          const text = await res.text().catch(() => '');
          throw new Error(`NONRETRYABLE_${res.status}:${text.slice(0, 200)}`);
        }

        const data = (await res.json()) as T; // may throw
        return data;
      } catch (err: any) {
        const msg = String(err?.message ?? '');
        const isAbort =
          err?.name === 'TimeoutError' || /aborted|timeout/i.test(msg);
        const isRetryable =
          isAbort ||
          /RETRYABLE_/i.test(msg) ||
          /ECONNRESET|ECONNREFUSED|EAI_AGAIN|ENOTFOUND|socket hang up/i.test(
            msg,
          );

        if (attempt <= retries + 1 && isRetryable) {
          const delay =
            baseDelay * 2 ** (attempt - 1) + Math.floor(Math.random() * 100);
          await new Promise((r) => setTimeout(r, delay));
          continue;
        }

        if (isAbort) throw new Error('UPSTREAM_TIMEOUT');
        throw new Error('UPSTREAM_FAILED');
      }
    }
  }

  /**
   * Returns the current download queue grouped by channel.
   * On any upstream failure or misconfiguration, returns {}.
   */
  async getDownloadQueue(): Promise<DownloadQueueByChannel> {
    const base = this.configService.get<string>('DL_SERVICE_URL');
    if (!base) {
      console.warn('[DL] DL_SERVICE_URL not configured');
      return {};
    }

    const queueUrl = base.replace(/\/+$/, '') + '/queue';

    let result: QueueItem[] = [];
    try {
      result = await this.httpGetJsonWithRetry<QueueItem[]>(queueUrl, {
        timeoutMs: Number(
          this.configService.get('DL_FETCH_TIMEOUT_MS') ?? 10000,
        ),
      });
    } catch (e: any) {
      console.warn('[DL] queue fetch failed:', e?.message ?? e);
      return {};
    }

    if (!Array.isArray(result) || result.length === 0) return {};

    // Batch DB lookup instead of N+1
    const videoIds = Array.from(
      new Set(result.map((r) => r.ytVideoId).filter(Boolean)),
    );
    if (videoIds.length === 0) return {};

    const dbVideos = await this.prismaService.uploadsVideo.findMany({
      where: { ytId: { in: videoIds } },
      include: {
        channel: { select: { ytId: true, title: true } },
      },
    });

    const byYtId = new Map(dbVideos.map((v) => [v.ytId, v]));

    const grouped: DownloadQueueByChannel = {};
    for (const item of result) {
      const dbItem = byYtId.get(item.ytVideoId);
      if (!dbItem || !dbItem.channel) continue;

      const downloadItem: DownloadQueueItem = {
        ytChannelId: dbItem.channel.ytId,
        ytVideoId: item.ytVideoId,
        videoTitle: dbItem.title,
        channelTitle: dbItem.channel.title,
        isDownloading: item.status === 'downloading',
        downloadProgress: String(item.progress ?? ''),
      };

      (grouped[dbItem.channel.ytId] ??= []).push(downloadItem);
    }

    return grouped;
  }

  /**
   * Adds a video to the downloader queue.
   * Never throws; returns a structured result instead.
   */
  async addToQueue({
    ytChannelId,
    ytVideoId,
  }: AddToQueueRequest): Promise<AddToQueueResult> {
    const base = this.configService.get<string>('DL_SERVICE_URL');
    if (!base) {
      console.warn('[DL] DL_SERVICE_URL not configured');
      return { ok: false, reason: 'MISCONFIG' };
    }

    const url = base.replace(/\/+$/, '') + '/add-to-queue';
    const timeoutMs = Number(
      this.configService.get('DL_FETCH_TIMEOUT_MS') ?? 10000,
    );
    const controller = AbortSignal.timeout(timeoutMs);

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ytChannelId, ytVideoId }),
        signal: controller,
      });

      if (!res.ok) {
        const reason: AddToQueueResult['reason'] =
          res.status >= 500
            ? 'UPSTREAM_5XX'
            : res.status >= 400
              ? 'UPSTREAM_4XX'
              : (`UPSTREAM_${res.status}` as const);

        console.warn('[DL] add-to-queue upstream error:', res.status);
        return { ok: false, reason };
      }

      try {
        const json = await res.json();
        return { ok: true, data: json };
      } catch {
        console.warn('[DL] add-to-queue: invalid JSON from upstream');
        return { ok: false, reason: 'BAD_JSON' };
      }
    } catch (e: any) {
      console.warn('[DL] add-to-queue failed:', e?.message ?? e);
      return { ok: false, reason: 'NETWORK' };
    }
  }
}
