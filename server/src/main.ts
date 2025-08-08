import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';
import { createBullBoard } from '@bull-board/api';
import { ExpressAdapter } from '@bull-board/express';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { queueNames } from 'src/shared/constants';
import * as express from 'express';
import * as path from 'path';
import redoc from 'redoc-express';
import { writeFileSync } from 'fs';
import { dump } from 'js-yaml';
import { ConfigService } from '@nestjs/config';
import { FilePathService } from './file/file-path.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const filePathService = app.get(FilePathService);

  const PORT = configService.get<number>('PORT', 3003);

  app.enableCors({
    origin: true,
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API Documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  writeFileSync('./openapi.yaml', dump(document));

  try {
    console.log('TypeScript definitions generated successfully');
  } catch (error) {
    console.error('Failed to generate TypeScript definitions:', error.message);
  }

  const theme = new SwaggerTheme();
  const options = {
    explorer: true,
    customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK),
    tagsSorter: 'alpha',
    operationsSorter: 'alpha',
  };

  SwaggerModule.setup('api', app, document, options);

  app.use('/docs/swagger.json', (req, res) => {
    res.send(document);
  });

  app.use(
    '/docs',
    redoc({
      title: 'API Documentation',
      specUrl: '/docs/swagger.json',
    }),
  );

  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath('/admin/queues');

  const videoQueue = app.get(`BullQueue_${queueNames.video}`);
  const downloadQueue = app.get(`BullQueue_${queueNames.download}`);
  const storyboardQueue = app.get(`BullQueue_${queueNames.storyboard}`);

  createBullBoard({
    queues: [
      new BullAdapter(videoQueue),
      new BullAdapter(downloadQueue),
      new BullAdapter(storyboardQueue),
    ],
    serverAdapter,
  });

  app.use('/admin/queues', serverAdapter.getRouter());
  app.use(
    '/uploads',
    express.static(path.join(filePathService.getBasePath(), 'Demo')),
  );

  await app.listen(PORT);
  console.log(`Application is running on: http://localhost:${PORT}`);
  console.log(`Swagger API Docs: http://localhost:${PORT}/api`);
  console.log(`Redoc API Docs: http://localhost:${PORT}/docs`);
  console.log(`Bull Board: http://localhost:${PORT}/admin/queues`);
}
bootstrap();
