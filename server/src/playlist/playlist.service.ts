import { Injectable } from '@nestjs/common';
import { YoutubeService } from 'src/core/external-services/youtube-api/youtube.service';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { ArtifactsAggregatorService } from 'src/artifacts-aggregator/artifacts-aggregator.service';

@Injectable()
export class PlaylistService {
  constructor(
    private readonly youtubeService: YoutubeService,
    private readonly prismaService: PrismaService,
    private readonly artifactsAggregatorService: ArtifactsAggregatorService,
  ) {}
}
