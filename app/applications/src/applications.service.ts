import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { CreateApplicationDto } from './dto/create-application.dto';
import { ApplicationStatus } from './enums/application-status.enum';
import { Application } from './schemas/application.schema';
import { Job } from './schemas/job.schema';

@Injectable()
export class ApplicationsService {
  constructor(
    @Inject('APPLICATIONS_SERVICE') private natsClient: ClientProxy,
    @InjectModel(Application.name) private applicationModel: Model<Application>,
    @InjectModel(Job.name) private jobModel: Model<Job>,
  ) {}

  getApplications(): string {
    throw new Error('Method not implemented in application service.');
  }

  getApplicationById(id: ObjectId): string {
    throw new Error('Method not implemented.');
  }

  async createApplication(
    createApplicationDto: CreateApplicationDto,
  ): Promise<Application> {
    const { jobId } = createApplicationDto;

    //Find the job user wants to apply to and make sure it exists
    const job = await this.jobModel.findById(jobId);
    const jobs = await this.jobModel.find().exec();

    console.log(jobs);

    if (!job) throw new NotFoundException(`Job with id ${jobId} not found!`);

    const createdApplication = new this.applicationModel(createApplicationDto);
    createdApplication.userId = new ObjectId('5f62755729608a001c8d5a40');
    const savedApplication = await createdApplication.save();
    this.natsClient.emit<string>('application_created', savedApplication);
    return savedApplication;
  }

  async updateApplicationStatus(
    id: ObjectId,
    status: ApplicationStatus,
  ): Promise<Application> {
    const updatedApplication = await this.applicationModel.findOneAndUpdate(
      { _id: id },
      { status },
      {
        new: true,
      },
    );
    this.natsClient.emit<string>('application_updated', updatedApplication);
    return updatedApplication;
  }

  deleteApplication(id: ObjectId): string {
    throw new Error('Method not implemented.');
  }
}
