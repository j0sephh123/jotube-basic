import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs/promises';
import sharp from 'sharp';
import { FilePathService } from 'src/file/file-path.service';
import os from 'os';

sharp.cache({ files: 0, memory: 64, items: 64 });
sharp.concurrency(Math.max(1, Math.min(4, os.cpus().length - 1)));

function pLimit(concurrency: number) {
  let active = 0;
  const queue: Array<() => void> = [];
  const next = () => {
    active--;
    if (queue.length) queue.shift()!();
  };
  return async function <T>(fn: () => Promise<T>): Promise<T> {
    if (active >= concurrency)
      await new Promise<void>((res) => queue.push(res));
    active++;
    try {
      return await fn();
    } finally {
      next();
    }
  };
}

@Injectable()
export class ThumbnailsService {
  private readonly SPACING = 10;
  private readonly THUMBNAIL_WIDTH = 1900;

  constructor(private readonly filePathService: FilePathService) {}

  async generateThumbnails({
    ytChannelId,
    ytVideoId,
    framesPerRow = 8,
  }: {
    ytChannelId: string;
    ytVideoId: string;
    framesPerRow?: number;
  }) {
    const basePath = this.filePathService.getBasePath();
    const screenshotsDir = `${basePath}/${ytChannelId}/${ytVideoId}/all_screenshots`;
    const thumbnailsDir = `${basePath}/${ytChannelId}/${ytVideoId}/thumbnails`;

    console.log('thumbnails_start', ytVideoId);

    const files = await this.getSortedFiles(screenshotsDir);

    // geometry
    const gridRows = 5;
    const framesPerFile = framesPerRow * gridRows;
    const totalFiles = Math.ceil(files.length / framesPerFile);

    const totalSpacingX = (framesPerRow - 1) * this.SPACING;
    const frameWidth = Math.floor(
      (this.THUMBNAIL_WIDTH - totalSpacingX) / framesPerRow,
    );
    const frameHeight = Math.floor(frameWidth * (9 / 16));
    const totalSpacingY = (gridRows - 1) * this.SPACING;
    const thumbnailHeight = gridRows * frameHeight + totalSpacingY;

    await fs.mkdir(thumbnailsDir, { recursive: true });

    const generatedFiles: string[] = [];

    // Process one thumbnail at a time (bounded peak memory)
    for (let fileIndex = 0; fileIndex < totalFiles; fileIndex++) {
      const startIndex = fileIndex * framesPerFile;
      const endIndex = Math.min(startIndex + framesPerFile, files.length);
      const batch = files.slice(startIndex, endIndex);

      // Resize this batch only, with limited parallelism
      const limit = pLimit(3); // tweak: 2–4 is usually safe
      const resized: Buffer[] = await Promise.all(
        batch.map((fname) =>
          limit(() =>
            sharp(path.join(screenshotsDir, fname))
              .resize(frameWidth, frameHeight)
              .toBuffer({ resolveWithObject: false }),
          ),
        ),
      );

      const composites = this.createCompositeFrames(
        resized,
        framesPerRow,
        frameWidth,
        frameHeight,
      );

      const outputThumbnail = `${thumbnailsDir}/${fileIndex}.png`;
      await sharp({
        create: {
          width: this.THUMBNAIL_WIDTH,
          height: thumbnailHeight,
          channels: 3,
          background: { r: 0, g: 0, b: 0 },
        },
      })
        .composite(composites)
        .png()
        .toFile(outputThumbnail);

      generatedFiles.push(outputThumbnail);
    }

    console.log('thumbnails_finish', ytVideoId);

    return {
      success: true,
      paths: generatedFiles,
      totalFrames: files.length,
      totalFiles,
    };
  }

  private async getSortedFiles(dir: string): Promise<string[]> {
    const all = await fs.readdir(dir);
    const files = all.filter((f) => f.endsWith('.png'));
    files.sort((a, b) => this.extractSeconds(a) - this.extractSeconds(b));
    return files;
  }

  private extractSeconds(filename: string): number {
    const parts = filename.split('-');
    return parseInt(parts[parts.length - 1].replace('.png', ''), 10);
  }

  private createCompositeFrames(
    resizedFrames: Buffer[],
    framesPerRow: number,
    frameWidth: number,
    frameHeight: number,
  ) {
    return resizedFrames.map((buffer, index) => {
      const x = (index % framesPerRow) * (frameWidth + this.SPACING);
      const y = Math.floor(index / framesPerRow) * (frameHeight + this.SPACING);
      return { input: buffer, top: y, left: x };
    });
  }
}
