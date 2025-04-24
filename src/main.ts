import { NestFactory } from '@nestjs/core';
import { AppModule } from './presentation/app.module';
import { TransformInterceptor } from './presentation/common/interceptors/transform.interceptor';
import { LoggingInterceptor } from './presentation/common/interceptors/logging.interceptor';
import { HttpExceptionFilter } from './presentation/common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Apply global interceptors
  app.useGlobalInterceptors(
    new TransformInterceptor(),
    new LoggingInterceptor(),
  );
  
  // Apply global filters
  app.useGlobalFilters(new HttpExceptionFilter());
  
  // Enable CORS
  app.enableCors();
  
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
