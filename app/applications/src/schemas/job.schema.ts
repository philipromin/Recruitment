import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

@Schema({
  toJSON: {
    transform(_, ret) {
      ret.id = ret._id;
      delete ret._id;
    },
  },
})
export class Job extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  recruiterId: ObjectId;
}

export const JobSchema = SchemaFactory.createForClass(Job);
