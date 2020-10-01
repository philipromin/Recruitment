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
  UnauthorizedException,
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

  @Post('/create')
  createJob(
    @Body(ValidationPipe) createJobDto: CreateJobDto,
    @Req() request: Request,
  ) {
    if (request.headers['user-role'] !== 'recruiter')
      throw new UnauthorizedException(
        'Only recruiters can create job listings.',
      );
    console.log(request.headers['user-id']);
    return this.jobsService.createJob(createJobDto, request.headers['user-id']);
  }

  @Delete('/:id')
  deleteJob(
    @Param('id', ParseObjectIdPipe) id: ObjectId,
    @Req() request: Request,
  ) {
    if (request.headers['user-role'] !== 'recruiter')
      throw new UnauthorizedException(
        'Only recruiters can create delete jobs.',
      );
    return this.jobsService.deleteJob(id);
  }
}
