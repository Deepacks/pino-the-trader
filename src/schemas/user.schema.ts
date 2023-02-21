import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class User {
  _id: Types.ObjectId;

  @Prop({ default: null })
  email: string;

  @Prop({ default: null })
  discordId: string;

  @Prop({ default: null })
  discordUsername: string;

  @Prop({ default: null })
  discordRefreshToken: string;

  @Prop({ default: null })
  googleId: string;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
