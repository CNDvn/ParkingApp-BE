import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port: number = configService.get('PORT');
  // setup open api - swagger
  const pathOpenApi: string = configService.get('PATH_OPEN_API');
  app.setGlobalPrefix(pathOpenApi);
  const config = new DocumentBuilder()
    .setTitle('Parking App')
    .setDescription('The solution to find the perfect parking spot')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(pathOpenApi, app, document);
  // end setup open api

  await app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running port: ${port}`);
  });
}

bootstrap();
