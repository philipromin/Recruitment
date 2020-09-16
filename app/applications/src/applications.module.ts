import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { ApplicationsController } from './applications.controller';
import { ApplicationsService } from './applications.service';
import { Application, ApplicationSchema } from './schemas/application.schema';
import { Job, JobSchema } from './schemas/job.schema';

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
    MongooseModule.forRoot('mongodb://jobs-mongo-srv:27017/applications'),
    MongooseModule.forFeature([
      { name: Application.name, schema: ApplicationSchema },
    ]),
    MongooseModule.forFeature([{ name: Job.name, schema: JobSchema }]),
  ],
  controllers: [ApplicationsController],
  providers: [ApplicationsService],
})
export class ApplicationsModule {}
