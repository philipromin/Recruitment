import { Controller, Get } from '@nestjs/common';
import { Ctx, MessagePattern, NatsContext, Payload } from '@nestjs/microservices';
import { ApplicationsService } from './applications.service';

@Controller('/api/applications')
export class ApplicationsController {
  constructor(private readonly appService: ApplicationsService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern('job_created')
  getNotifications(@Payload() data: any, @Ctx() context: NatsContext) {
    console.log('JOB CREATED EVENT')
    console.log(data)
    console.log(`Subject: ${context.getSubject()}`);
}
}
