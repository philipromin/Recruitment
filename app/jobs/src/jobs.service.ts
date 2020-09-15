import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';

@Injectable()
export class JobsService {
  deleteJob(id: number) {
    return `Deleting job with id ${id}`;
  }
  createJob(createJobDto: CreateJobDto) {
    return createJobDto;
  }
  getJobById(id: number): string {
    return `Getting job with id ${id}`;
  }

  getAllJobs(): string {
    return 'All Jobs';
  }
}
