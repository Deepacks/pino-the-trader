import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from 'src/schemas/user.schema';
import { DiscordUserDTO } from 'src/auth/dto/discordUser-dto.type';
import { GoogleUserDTO } from 'src/auth/dto/googleUser-dto.type';
import { UserDTO } from './dto/user-dto.typ';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async findById(userId: string): Promise<UserDocument> {
    return this.userModel.findById(userId);
  }

  async findByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email });
  }

  async findByDiscordId(discordId: string): Promise<UserDocument> {
    return this.userModel.findOne({ discordId });
  }

  async findByGoogleId(googleId: string): Promise<UserDocument> {
    return this.userModel.findOne({ googleId });
  }

  async updateUser(
    userId: string,
    userUpdate: Partial<User>,
  ): Promise<UserDocument> {
    const updateResult = await this.userModel.findOneAndUpdate(
      { _id: userId },
      { ...userUpdate },
      { returnDocument: 'after' },
    );

    return updateResult;
  }

  async registerUserFromDiscord(
    discordUser: DiscordUserDTO & { discordRefreshToken: string },
  ): Promise<UserDocument> {
    const { id: discordId, email, username, discordRefreshToken } = discordUser;

    return this.userModel.create({
      discordId,
      email,
      discordUsername: username,
      discordRefreshToken,
    });
  }

  async registerUserFromGoogle(
    googleUser: GoogleUserDTO,
  ): Promise<UserDocument> {
    const { googleId, email } = googleUser;

    return this.userModel.create({
      googleId,
      email,
    });
  }

  async getUserData(userId: string): Promise<UserDTO> {
    const { discordUsername: username, email } = await this.userModel.findById(
      userId,
      {
        discordUsername: true,
        email: true,
      },
    );

    return { username, email };
  }
}
