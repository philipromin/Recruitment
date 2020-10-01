import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Request,
  ValidationPipe,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { ApplicationStatus } from './enums/application-status.enum';
import { ApplicationStatusValidationPipe } from './pipes/ApplicationStatusValidationPipe';
import { ParseObjectIdPipe } from './pipes/ParseObjectIdPipe';
import { Application } from './schemas/application.schema';
import { Job } from './schemas/job.schema';

@Controller('/api/applications')
export class ApplicationsController {
  constructor(
    private readonly applicationsService: ApplicationsService,
    @InjectModel(Job.name) private jobModel: Model<Job>,
  ) {}

  @Get()
  getApplications(@Req() request: Request): Promise<Application[]> {
    return this.applicationsService.getApplications(request.headers['user-id']);
  }

  @Get('/:id')
  getApplicationById(
    @Param('id', ParseObjectIdPipe) id: ObjectId,
  ): Promise<Application> {
    return this.applicationsService.getApplicationById(id);
  }

  @Post()
  createApplication(
    @Body(ValidationPipe) createJobDto: CreateApplicationDto,
    @Req() request: Request,
  ) {
    return this.applicationsService.createApplication(
      createJobDto,
      request.headers['user-id'],
    );
  }

  @Patch('/:id/status')
  updateApplicationStatus(
    @Param('id', ParseObjectIdPipe) id: ObjectId,
    @Body('status', ApplicationStatusValidationPipe) status: ApplicationStatus,
  ) {
    return this.applicationsService.updateApplicationStatus(id, status);
  }

  @Delete('/:id')
  deleteApplication(@Param('id', ParseObjectIdPipe) id: ObjectId): string {
    return this.applicationsService.deleteApplication(id);
  }

  @MessagePattern('job_created')
  async getNotifications(@Payload() data: any) {
    const createdJob = new this.jobModel(data);
    createdJob._id = data.id;
    await createdJob.save();
  }
}
