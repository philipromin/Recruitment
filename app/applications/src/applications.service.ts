import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { ApplicationsModule } from './applications.module';
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

  async getApplications(userId: ObjectId): Promise<Application[]> {
    return await this.applicationModel.find({ userId: userId });
  }

  async getApplicationById(id: ObjectId): Promise<Application> {
    const application = await this.applicationModel.findById(id).exec();

    if (!application)
      throw new NotFoundException(`Job with ID ${id} not found!`);

    return application;
  }

  async createApplication(
    createApplicationDto: CreateApplicationDto,
    userId: ObjectId,
  ): Promise<Application> {
    const { jobId } = createApplicationDto;

    //Find the job user wants to apply to and make sure it exists
    const job = await this.jobModel.findById(jobId);

    if (!job) throw new NotFoundException(`Job with id ${jobId} not found!`);

    const createdApplication = new this.applicationModel(createApplicationDto);
    createdApplication.userId = userId;
    createdApplication.job = job;
    const savedApplication = await createdApplication.save();
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
