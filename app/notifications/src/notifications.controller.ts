import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NotificationsService } from './notifications.service';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @MessagePattern('application_updated')
  notifyUserApplicationChange(@Payload() data: any) {
    this.notificationsService.notifyUserApplicationChange(data);
  }
}
