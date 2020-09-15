import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';

@Controller('/api/jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  getHello(): string {
    return this.jobsService.getAllJobs();
  }

  @Get('/:id')
  getJobById(@Param('id', ParseIntPipe) id: number): string {
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
