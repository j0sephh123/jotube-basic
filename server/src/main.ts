import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';
import { createBullBoard } from '@bull-board/api';
import { ExpressAdapter } from '@bull-board/express';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { queueNames } from 'src/shared/constants';
import redoc from 'redoc-express';
import { writeFileSync } from 'fs';
import { dump } from 'js-yaml';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
    abortOnError: false,
  });

  const configService = app.get(ConfigService);

  const PORT = configService.get<number>('PORT', 3003);

  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());

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
  const episodeQueue = app.get(`BullQueue_${queueNames.episode}`);
  createBullBoard({
    queues: [
      new BullAdapter(videoQueue),
      new BullAdapter(downloadQueue),
      new BullAdapter(storyboardQueue),
      new BullAdapter(episodeQueue),
    ],
    serverAdapter,
  });

  app.use('/admin/queues', serverAdapter.getRouter());

  await app.listen(PORT);
  console.log(`Application is running on: http://localhost:${PORT}`);
  console.log(`Swagger API Docs: http://localhost:${PORT}/api`);
  console.log(`Redoc API Docs: http://localhost:${PORT}/docs`);
  console.log(`Bull Board: http://localhost:${PORT}/admin/queues`);
  console.log(`GraphQL Playground: http://localhost:${PORT}/graphql`);
}
bootstrap();
