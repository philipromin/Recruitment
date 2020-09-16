import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateApplicationDto } from './dto/create-application.dto';

@Injectable()
export class ApplicationsService {
  constructor(
    @Inject('APPLICATIONS_SERVICE') private natsClient: ClientProxy,
  ) {}

  getApplications(): string {
    throw new Error('Method not implemented in application service.');
  }

  getApplicationById(id: number): string {
    throw new Error('Method not implemented.');
  }

  createApplication(createApplicationDto: CreateApplicationDto): any {
    this.natsClient.emit<string>('application_created', createApplicationDto)
    return createApplicationDto;
  }
}
