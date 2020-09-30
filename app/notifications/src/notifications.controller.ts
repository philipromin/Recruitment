import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  NatsContext,
  Payload,
} from '@nestjs/microservices';
import { NotificationsService } from './notifications.service';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @MessagePattern('job_created')
  greetNewUser(@Payload() data: number[]) {
    console.log(data);
    this.notificationsService.emailNewUser(data);
  }

  @MessagePattern('application_updated')
  notifyUserApplicationChange(@Payload() data: number[]) {
    console.log(data);
    this.notificationsService.notifyUserApplicationChange(data);
  }
}
