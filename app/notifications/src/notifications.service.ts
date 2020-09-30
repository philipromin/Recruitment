import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  notifyUserApplicationChange(data: number[]) {
    //Email user whose application has changed
  }
  emailNewUser(data: number[]) {
    //Email new user here
  }
}
