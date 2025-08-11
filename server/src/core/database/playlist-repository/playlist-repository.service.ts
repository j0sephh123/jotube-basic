import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PlaylistRepositoryService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllPlaylists() {
    return this.prisma.playlist.findMany();
  }
}
