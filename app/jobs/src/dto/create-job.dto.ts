import { IsNotEmpty } from 'class-validator';

export class CreateJobDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  requirements: string;
}
