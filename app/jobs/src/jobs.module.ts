import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'JOBS_SERVICE',
        transport: Transport.NATS,
        options: {
          url: process.env.NATS_URL,
        },
      },
    ]),
  ],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}