import { Injectable } from '@nestjs/common';

@Injectable()
export class ApplicationsService {
  getHello(): string {
    return 'Hello Applications!';
  }
}