import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { Job } from './schemas/job.schema';
import { GetByIdDto } from './dto/get-by-id.dto';

@Controller('/api/jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  getHello(): Promise<Job[]> {
    return this.jobsService.getAllJobs();
  }

  @Get('/:id')
  getJobById(@Param('id') id: string): Promise<Job> {
    return this.jobsService.getJobById(id);
  }

  @Post()
  createJob(@Body(ValidationPipe) createJobDto: CreateJobDto) {
    return this.jobsService.createJob(createJobDto);
  }

  @Delete('/:id')
  deleteJob(@Param('id', ParseIntPipe) id: number) {
    return this.jobsService.deleteJob(id);
  }
}
