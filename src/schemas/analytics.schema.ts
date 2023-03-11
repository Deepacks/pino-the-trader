import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

@Schema()
export class Analytics {
  _id: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, required: true })
  user: Types.ObjectId;

  @Prop({ default: null })
  discordId: string;

  @Prop({ required: true })
  lastLogin: Date;

  @Prop({
    type: raw({ textToImageInteractions: Number, askInteraction: Number }),
    default: { textToImageInteractions: 0, askInteraction: 0 },
  })
  openAiData: { textToImageInteractions: number; askInteraction: number };
}

export type AnalyticsDocument = Analytics & Document;

export const AnalyticsSchema = SchemaFactory.createForClass(Analytics);
