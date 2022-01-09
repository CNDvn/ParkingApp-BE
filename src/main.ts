import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000, () => {
    // eslint-disable-next-line no-console
    console.log('Server running port: 3000');
  });
}
bootstrap();
