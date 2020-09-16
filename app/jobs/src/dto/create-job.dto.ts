import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateJobDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  requirements: Array<string>;
}
