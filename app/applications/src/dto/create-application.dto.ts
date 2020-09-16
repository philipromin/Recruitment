import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ObjectId } from 'mongodb';

export class CreateApplicationDto {
  @IsNotEmpty()
  @IsMongoId()
  jobId: ObjectId;

  @IsOptional()
  @IsString()
  message: string;
}
