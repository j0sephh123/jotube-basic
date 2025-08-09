// logging/logging.module.ts
import { Module } from '@nestjs/common';
import { ServiceLogger } from './service-logger';

@Module({ providers: [ServiceLogger], exports: [ServiceLogger] })
export class LoggingModule {}
