import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger';
import * as helmet from 'helmet';
import * as bodyParser from 'body-parser';
import { configService } from './config/config.service';
import { ExceptionsFilter } from './core/exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.enableCors();
  app.setGlobalPrefix('api');
  setupSwagger(app);
  app.useGlobalFilters(new ExceptionsFilter());
  const port = configService.getPort();
  await app.listen(port);
}
bootstrap();
