import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { NotificationsModule } from './notifications.module';

async function bootstrap() {
  const app = await NestFactory.create(NotificationsModule);
  const microservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      url: process.env.NATS_URL,
      queue: 'notifications-service',
    },
  });
  await app.startAllMicroservicesAsync();
  await app.listen(3000);
}
bootstrap();
