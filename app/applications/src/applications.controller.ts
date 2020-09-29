import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  NatsContext,
  Payload,
} from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { ApplicationStatus } from './enums/application-status.enum';
import { ApplicationStatusValidationPipe } from './pipes/ApplicationStatusValidationPipe';
import { ParseObjectIdPipe } from './pipes/ParseObjectIdPipe';
import { Job } from './schemas/job.schema';

@Controller('/api/applications')
export class ApplicationsController {
  constructor(
    private readonly applicationsService: ApplicationsService,
    @InjectModel(Job.name) private jobModel: Model<Job>,
  ) {}

  @Get()
  getApplications(): string {
    return this.applicationsService.getApplications();
  }

  @Get('/:id')
  getApplicationById(@Param('id', ParseObjectIdPipe) id: ObjectId): string {
    return this.applicationsService.getApplicationById(id);
  }

  @Post()
  createApplication(@Body(ValidationPipe) createJobDto: CreateApplicationDto) {
    return this.applicationsService.createApplication(createJobDto);
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
  async getNotifications(@Payload() data: any, @Ctx() context: NatsContext) {
    const createdJob = new this.jobModel(data);
    createdJob._id = data.id;
    await createdJob.save();
  }
}
