import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  // setup cookie
  app.use(cookieParser());

  const configService = app.get(ConfigService);
  const versionOpenApi: string = configService.get('VERSION_OPEN_API');
  const port: number = configService.get('PORT');
  app.setGlobalPrefix(versionOpenApi);
  // setup open api - swagger
  const config = new DocumentBuilder()
    .setTitle('Parking App')
    .setDescription('The solution to find the perfect parking spot')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(versionOpenApi, app, document);
  // end setup open api

  await app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running port: ${port}`);
  });
}

bootstrap();
