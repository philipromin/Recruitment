import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateJobDto } from './dto/create-job.dto';
import { Job } from './schemas/job.schema';

@Injectable()
export class JobsService {
  constructor(
    @Inject('JOBS_SERVICE') private natsClient: ClientProxy,
    @InjectModel(Job.name) private jobModel: Model<Job>
  ) {}
  
  deleteJob(id: string) {
    return `Deleting job with id ${id}`;
  }

  async createJob(createJobDto: CreateJobDto) {
    const createdJob = new this.jobModel(createJobDto)
    createdJob.userId = 1245;
    this.natsClient.emit<string>('job_created', createdJob)
    return createdJob.save();
  }

  async getJobById(id: string): Promise<Job> {
    const job = await this.jobModel.findById(id).exec()

    if(!job) throw new NotFoundException(`Job with ID ${id} not found!`)

    return job
  }

  async getAllJobs(): Promise<Job[]> {
    return this.jobModel.find().exec()
  }
}
