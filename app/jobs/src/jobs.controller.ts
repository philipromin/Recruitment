import {
  BadRequestException,
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
import { Job } from './schemas/job.schema';
import { isValidObjectId } from 'mongoose';

@Controller('/api/jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  getAllJobs(): Promise<Job[]> {
    return this.jobsService.getAllJobs();
  }

  @Get('/:id')
  getJobById(@Param('id') id: string): Promise<Job> {
    //Make this in to a pipe later
    if(!isValidObjectId(id)) throw new BadRequestException(`${id} is not a valid ObjectId`)

    return this.jobsService.getJobById(id);
  }

  @Post()
  createJob(@Body(ValidationPipe) createJobDto: CreateJobDto) {
    return this.jobsService.createJob(createJobDto);
  }

  @Delete('/:id')
  deleteJob(@Param('id') id: string) {
    //Make this in to a pipe later
    if(!isValidObjectId(id)) throw new BadRequestException(`${id} is not a valid ObjectId`)

    return this.jobsService.deleteJob(id);
  }
}
