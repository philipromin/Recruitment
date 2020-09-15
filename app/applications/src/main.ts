import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { ApplicationsModule } from './applications.module';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationsModule);
  const microservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      url: process.env.NATS_URL,
      queue: 'applications-service',
    },
  });
  await app.startAllMicroservicesAsync();
  await app.listen(3000);
}
bootstrap();
