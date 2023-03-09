import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtGuard } from './auth/guard'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new JwtGuard())
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true
  }))
  await app.listen(3001);
}
bootstrap();
