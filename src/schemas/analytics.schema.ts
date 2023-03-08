import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

@Schema()
export class Analytics {
  _id: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, required: true })
  user: Types.ObjectId;

  @Prop({ required: true })
  lastLogin: Date;
}

export type AnalyticsDocument = Analytics & Document;

export const AnalyticsSchema = SchemaFactory.createForClass(Analytics);
