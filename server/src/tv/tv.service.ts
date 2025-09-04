import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { CreateTvInput, TvMessage } from './dtos';

@Injectable()
export class TvService {
  constructor(private readonly prismaService: PrismaService) {}

  async create({ identifier, title, duration }: CreateTvInput) {
    try {
      const tv = await this.prismaService.tV.create({
        data: {
          identifier,
          title,
          duration,
        },
      });

      return {
        tv,
        message: TvMessage.CREATED_SUCCESSFULLY,
      };
    } catch {
      return {
        tv: null,
        message: TvMessage.FAILED_TO_CREATE,
      };
    }
  }

  async findAll() {
    return this.prismaService.tV.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number) {
    return this.prismaService.tV.findUnique({
      where: { id },
    });
  }

  async update(id: number, { identifier, title, duration }: CreateTvInput) {
    try {
      const tv = await this.prismaService.tV.update({
        where: { id },
        data: {
          identifier,
          title,
          duration,
        },
      });

      return {
        tv,
        message: TvMessage.UPDATED_SUCCESSFULLY,
      };
    } catch {
      return {
        tv: null,
        message: TvMessage.FAILED_TO_UPDATE,
      };
    }
  }

  async delete(id: number) {
    try {
      await this.prismaService.tV.delete({
        where: { id },
      });

      return { success: true, message: 'TV deleted successfully' };
    } catch {
      return { success: false, message: 'Failed to delete TV' };
    }
  }
}
