import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateJobDto } from './dto/create-job.dto';

@Injectable()
export class JobsService {
  constructor(
    @Inject('JOBS_SERVICE') private natsClient: ClientProxy,
  ) {}
  
  deleteJob(id: number) {
    this.natsClient.emit<string>('job_created', "job deleted")
    return `Deleting job with id ${id}`;
  }
  createJob(createJobDto: CreateJobDto) {
    this.natsClient.emit<string>('job_created', createJobDto)
    return createJobDto;
  }
  getJobById(id: number): string {
    return `Getting job with id ${id}`;
  }

  getAllJobs(): string {
    return 'All Jobs';
  }
}
