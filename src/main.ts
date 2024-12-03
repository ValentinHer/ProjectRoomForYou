import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({transform: true, whitelist: true}));
  app.use(cookieParser());
  app.enableCors({origin: ["http://localhost:3000", "http://localhost:4000"], credentials: true});

  const config = new DocumentBuilder()
  .setTitle('RoomForYou')
  .setDescription('The RoomForYou project API description')
  .setVersion('1.0')
  .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT || 4000);
}

bootstrap();
