import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port: number = configService.get('PORT');

  await app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running port: ${port}`);
  });
}

bootstrap();
