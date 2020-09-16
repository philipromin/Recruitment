import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
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
import { ObjectId } from 'mongodb';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { ApplicationStatus } from './enums/application-status.enum';
import { ApplicationStatusValidationPipe } from './pipes/ApplicationStatusValidationPipe';
import { ParseObjectIdPipe } from './pipes/ParseObjectIdPipe';

@Controller('/api/applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Get()
  getApplications(): string {
    return this.applicationsService.getApplications();
  }

  @Get('/:id')
  getApplicationById(@Param('id', ParseIntPipe) id: number): string {
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
    return this.applicationsService.updateTodoStatus(id, status);
  }

  @MessagePattern('job_created')
  getNotifications(@Payload() data: any, @Ctx() context: NatsContext) {
    console.log('JOB CREATED EVENT');
    console.log(data);
    console.log(`Subject: ${context.getSubject()}`);
  }
}
