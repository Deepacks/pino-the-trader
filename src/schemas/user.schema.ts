import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class User {
  _id: Types.ObjectId;

  @Prop({ required: true })
  discordId: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  refreshToken: string;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
