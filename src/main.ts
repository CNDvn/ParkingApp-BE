import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port: number = configService.get('PORT');

  // setup open api - swagger
  const config = new DocumentBuilder()
    .setTitle('Parking App')
    .setDescription('The solution to find the perfect parking spot')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // end setup open api

  await app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running port: ${port}`);
  });
}

bootstrap();
