import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class User {
  _id: Types.ObjectId;

  @Prop({ default: false })
  admin: boolean;

  @Prop({ default: null })
  email: string;

  @Prop({ default: null })
  firstName: string;

  @Prop({ default: null })
  lastName: string;

  @Prop({ default: null })
  discordId: string;

  @Prop({ default: null })
  discordUsername: string;

  @Prop({ default: null })
  discordRefreshToken: string;

  @Prop({ default: null })
  googleId: string;

  @Prop({ default: null })
  googleAccessToken: string;

  @Prop({ default: null })
  googleRefreshToken: string;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
