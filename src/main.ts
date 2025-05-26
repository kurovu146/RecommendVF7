import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, NestApplicationOptions } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  
  await app.listen(process.env.PORT ?? 3000).then(async () => {
    logger.log(`🚀 Server ready at: ${await app.getUrl()} 🚀`);
  });
}
bootstrap();
