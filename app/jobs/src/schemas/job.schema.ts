import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Job extends Document {
    @Prop({ required: true })
    title: string

    @Prop({ required: true })
    description:string

    @Prop({ required: true })
    userId:number

    @Prop([String])
    requirements: string[]
}

export const JobSchema = SchemaFactory.createForClass(Job);
