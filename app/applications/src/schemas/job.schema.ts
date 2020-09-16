import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
  description: string;

  @Prop({ required: true })
  recruiterId: number;

  @Prop([String])
  requirements: string[];
}

export const JobSchema = SchemaFactory.createForClass(Job);
