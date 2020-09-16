import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { ApplicationStatus } from 'src/enums/application-status.enum';

export class ApplicationStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    ApplicationStatus.PENDING,
    ApplicationStatus.APPROVED,
    ApplicationStatus.REJECTED,
  ];

  transform(value: any) {
    if (!value) throw new BadRequestException(`Please provide a status`);
    if (typeof value !== 'string') {
      throw new BadRequestException(`Status can only be a string`);
    }

    value = value.toUpperCase();

    if (!this.isStatusValid(value))
      throw new BadRequestException(`${value} is not a valid status!`);

    return value;
  }

  private isStatusValid(status: any) {
    const index = this.allowedStatuses.indexOf(status);
    return index !== -1;
  }
}
