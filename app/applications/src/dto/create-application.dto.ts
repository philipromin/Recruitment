import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateApplicationDto {
  @IsNotEmpty()
  jobId: number;

  @IsOptional()
  @IsString()
  message: string;
}