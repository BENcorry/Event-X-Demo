import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/App/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: console,
  });
  await app.listen(3000).then(() => {
    console.log('App Start at 3000');
  });
}
bootstrap();
