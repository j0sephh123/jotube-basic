import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FilePathService {
  constructor(private readonly configService: ConfigService) {}

  public getBasePath() {
    return this.configService.get('FILE_PATH_YOUTUBE');
  }

  public getPublicFolder() {
    return this.configService.get('PUBLIC_FOLDER');
  }
}
