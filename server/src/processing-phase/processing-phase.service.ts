import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { ProcessingPhaseResponse } from './dtos/processing-phase.response';

@Injectable()
export class ProcessingPhaseService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(
    variant: 'latest' | 'running' = 'latest',
  ): Promise<ProcessingPhaseResponse[]> {
    const where = variant === 'running' ? { endedAt: null } : {};

    return this.prismaService.processingPhase.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      take: 100,
      include: {
        uploadsVideo: {
          select: {
            id: true,
            ytId: true,
            title: true,
            channel: {
              select: {
                id: true,
                title: true,
                ytId: true,
              },
            },
          },
        },
      },
    });
  }
}
