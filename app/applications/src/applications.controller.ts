import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  NatsContext,
  Payload,
} from '@nestjs/microservices';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';

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

  @MessagePattern('job_created')
  getNotifications(@Payload() data: any, @Ctx() context: NatsContext) {
    console.log('JOB CREATED EVENT');
    console.log(data);
    console.log(`Subject: ${context.getSubject()}`);
  }
}
