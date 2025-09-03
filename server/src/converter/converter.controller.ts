import {
  Controller,
  Post,
  Body,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ConverterService } from './converter.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('converter')
export class ConverterController {
  constructor(private readonly converterService: ConverterService) {}

  @Post('')
  @ApiOperation({ summary: 'Convert YouTube ID to database ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the database ID',
    type: Object,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request when type or value is invalid',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found when channel or upload does not exist',
  })
  async convert(@Body() body: any): Promise<{
    id: number;
    title: string;
    ytId: string;
    channelTitle?: string;
  }> {
    if (!body.type) {
      throw new BadRequestException('Type is required');
    }
    if (body.type !== 'youtube' && body.type !== 'id') {
      throw new BadRequestException('Type should be either "youtube" or "id"');
    }
    if (!body.value) {
      throw new BadRequestException('Value is required');
    }
    if (!body.resource) {
      throw new BadRequestException('Resource is required');
    }
    if (body.resource !== 'video' && body.resource !== 'channel') {
      throw new BadRequestException(
        'Resource should be either "video" or "channel"',
      );
    }

    try {
      return await this.converterService.convertValue(
        body.type,
        body.value,
        body.resource,
      );
    } catch (error) {
      if (
        error.message === 'Channel not found' ||
        error.message === 'Upload not found'
      ) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }
}
