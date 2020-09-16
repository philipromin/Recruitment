import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { Job, JobSchema } from './schemas/job.schema';

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
    MongooseModule.forRoot('mongodb://jobs-mongo-srv:27017/jobs'),
    MongooseModule.forFeature([{ name: Job.name, schema: JobSchema }])
  ],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}
