import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { Logger, RequestMethod, ValidationPipe } from '@nestjs/common';
import { RpcCustomExceptionFilter } from './common/exceptions/rpc-custom-exception.filter';


async function bootstrap() {

  const logger = new Logger('Main-gateway');

  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));
  
  app.setGlobalPrefix('api',{
    exclude: [{ path: '', method: RequestMethod.GET }],
  });

  app.useGlobalFilters(new RpcCustomExceptionFilter());

  await app.listen(envs.port);

  console.log("Hola mundo - primer cambio")


  logger.log(`Gateway corriendo en puerto: ${envs.port}`);
}
bootstrap();
