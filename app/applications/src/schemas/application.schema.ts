import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';
import { ApplicationStatus } from 'src/enums/application-status.enum';
import { Job } from './job.schema';

@Schema({
  toJSON: {
    transform(_, ret) {
      ret.id = ret._id;
      delete ret._id;
    },
  },
})
export class Application extends Document {
  @Prop({ required: true })
  job: Job;

  @Prop({ required: true })
  userId: ObjectId;

  @Prop({
    required: true,
    enum: Object.values(ApplicationStatus),
    default: ApplicationStatus.PENDING,
  })
  status: ApplicationStatus;

  @Prop()
  message: string;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
