import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as firebaseAdmin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

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

  // setup firebase

  // setup config option
  const firebaseConfig: ServiceAccount = {
    projectId: configService.get<string>('FIREBASE_PROJECT_ID'),
    privateKey: configService
      .get<string>('FIREBASE_PRIVATE_KEY')
      .replace(/\\n/g, '\n'),
    clientEmail: configService.get<string>('FIREBASE_CLIENT_EMAIL'),
  };

  // initialize the firebase admin app
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(firebaseConfig),
    // databaseURL:"",
  });
  // end setup firebase
  // const whitelist = [
  //   'http://localhost:3000',
  //   'http://localhost:5000',
  //   'https://parking-app-project.herokuapp.com',
  //   'https://parking-app-theta.vercel.app/',
  //   'https://parking-app-2fpv44rgx-cndvn.vercel.app/',
  // ];
  app.enableCors({
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    origin: '*',
    //   function (origin, callback) {
    //   if (!origin || whitelist.indexOf(origin) !== -1) {
    //     // eslint-disable-next-line no-console
    //     console.log('allowed cors for:', origin);
    //     callback(null, true);
    //   } else {
    //     // eslint-disable-next-line no-console
    //     console.log('blocked cors for:', origin);
    //     callback(new Error('Not allowed by CORS'));
    //   }
    // },
    exposedHeaders: ['Set-Cookie'],
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running port: ${port}`);
  });
}

bootstrap();
