import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ApplicationsController } from './applications.controller';
import { ApplicationsService } from './applications.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'APPLICATIONS_SERVICE',
        transport: Transport.NATS,
        options: {
          url: process.env.NATS_URL,
        },
      },
    ]),
  ],
  controllers: [ApplicationsController],
  providers: [ApplicationsService],
})
export class ApplicationsModule {}
