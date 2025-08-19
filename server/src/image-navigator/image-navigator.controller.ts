import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ImageNavigatorService } from './image-navigator.service';
import { ImageNavigatorRequestDto } from './dtos/image-navigator.request';
import { ImageNavigatorResponseDto } from './dtos/image-navigator.response';

@Controller('image-navigator')
export class ImageNavigatorController {
  constructor(private readonly imageNavigatorService: ImageNavigatorService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async getScreenshots(
    @Body() request: ImageNavigatorRequestDto,
  ): Promise<ImageNavigatorResponseDto> {
    return this.imageNavigatorService.getScreenshots(request);
  }
}
