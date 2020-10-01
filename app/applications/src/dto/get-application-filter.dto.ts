import { IsMongoId, IsOptional } from 'class-validator';
import { ObjectId } from 'mongodb';

export class GetApplicationFilterDto {
  @IsOptional()
  @IsMongoId()
  job: ObjectId;
}
