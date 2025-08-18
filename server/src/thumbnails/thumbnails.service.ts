import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';
import { FilePathService } from 'src/file/file-path.service';

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

    try {
      const files = this.getSortedFiles(screenshotsDir);
      const framesPerFile = framesPerRow * 5;
      const totalFiles = Math.ceil(files.length / framesPerFile);

      const totalSpacing = (framesPerRow - 1) * this.SPACING;
      const frameWidth = Math.floor(
        (this.THUMBNAIL_WIDTH - totalSpacing) / framesPerRow,
      );
      const frameHeight = Math.floor(frameWidth * (9 / 16));
      const gridHeight = 5;
      const thumbnailHeight =
        gridHeight * frameHeight + (gridHeight - 1) * this.SPACING;

      const resizedFrames = await this.resizeFrames(
        files,
        screenshotsDir,
        frameWidth,
        frameHeight,
      );

      const generatedFiles: string[] = [];

      for (let fileIndex = 0; fileIndex < totalFiles; fileIndex++) {
        const startIndex = fileIndex * framesPerFile;
        const endIndex = Math.min(
          startIndex + framesPerFile,
          resizedFrames.length,
        );
        const fileFrames = resizedFrames.slice(startIndex, endIndex);

        const compositeFrames = this.createCompositeFrames(
          fileFrames,
          framesPerRow,
          frameWidth,
          frameHeight,
        );

        const outputThumbnail = `${thumbnailsDir}/${fileIndex}.png`;
        const thumbnailPath = await this.generateGridImage(
          compositeFrames,
          this.THUMBNAIL_WIDTH,
          thumbnailHeight,
          outputThumbnail,
        );

        generatedFiles.push(thumbnailPath);
      }

      console.log('thumbnails_finish', ytVideoId);

      return {
        success: true,
        paths: generatedFiles,
        totalFrames: files.length,
        totalFiles,
      };
    } catch (error) {
      throw error;
    }
  }

  private getSortedFiles(dir: string): string[] {
    try {
      const files = fs.readdirSync(dir).filter((file) => file.endsWith('.png'));

      files.sort((a, b) => {
        const secondsA = this.extractSeconds(a);
        const secondsB = this.extractSeconds(b);
        return secondsA - secondsB;
      });

      return files;
    } catch (error) {
      throw error;
    }
  }

  private extractSeconds(filename: string): number {
    const parts = filename.split('-');
    return parseInt(parts[parts.length - 1].replace('.png', ''), 10);
  }

  private async resizeFrames(
    files: string[],
    dir: string,
    frameWidth: number,
    frameHeight: number,
  ) {
    try {
      const resizedFrames = await Promise.all(
        files.map((file) =>
          sharp(path.join(dir, file))
            .resize(frameWidth, frameHeight)
            .toBuffer(),
        ),
      );

      return resizedFrames;
    } catch (error) {
      throw error;
    }
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

  private async generateGridImage(
    compositeFrames: { input: Buffer; top: number; left: number }[],
    thumbnailWidth: number,
    thumbnailHeight: number,
    outputPath: string,
  ) {
    try {
      const outputDir = path.dirname(outputPath);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      await sharp({
        create: {
          width: thumbnailWidth,
          height: thumbnailHeight,
          channels: 3,
          background: { r: 0, g: 0, b: 0 },
        },
      })
        .composite(compositeFrames)
        .toFile(outputPath);

      return outputPath;
    } catch (error) {
      throw error;
    }
  }
}
