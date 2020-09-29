import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  ValidationPipe,
  Request,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { Job } from './schemas/job.schema';
import { ObjectId } from 'mongodb';
import { ParseObjectIdPipe } from './pipes/ParseObjectIdPipe';

@Controller('/api/jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  getAllJobs(): Promise<Job[]> {
    return this.jobsService.getAllJobs();
  }

  @Get('/:id')
  getJobById(@Param('id', ParseObjectIdPipe) id: ObjectId): Promise<Job> {
    return this.jobsService.getJobById(id);
  }

  @Post()
  createJob(
    @Body(ValidationPipe) createJobDto: CreateJobDto,
    @Req() request: Request,
  ) {
    console.log(request.headers['user-id']);
    console.log(request.headers['user-role']);
    return this.jobsService.createJob(createJobDto);
  }

  @Delete('/:id')
  deleteJob(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    return this.jobsService.deleteJob(id);
  }
}
