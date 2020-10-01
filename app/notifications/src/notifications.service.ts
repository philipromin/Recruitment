import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  notifyUserApplicationChange(data: any) {
    //Email user whose application has changed
  }
}
