import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from 'src/schemas/user.schema';
import { AnalyticsService } from '../analytics/analytics.service';
import { DiscordUserDTO } from 'src/auth/dto/discordUser-dto.type';
import { GoogleUserDTO } from 'src/auth/dto/googleUser-dto.type';
import { UserDTO } from './dto/user-dto.typ';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly analyticsService: AnalyticsService,
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

    const newUser = await this.userModel.create({
      discordId,
      email,
      discordUsername: username,
      discordRefreshToken,
    });

    await this.analyticsService.createAnalytics(newUser._id);

    return newUser;
  }

  async registerUserFromGoogle(
    googleUser: GoogleUserDTO,
  ): Promise<UserDocument> {
    const {
      googleId,
      email,
      firstName,
      lastName,
      googleAccessToken,
      googleRefreshToken,
    } = googleUser;

    const newUser = await this.userModel.create({
      googleId,
      email,
      firstName,
      lastName,
      googleAccessToken,
      googleRefreshToken,
    });

    await this.analyticsService.createAnalytics(newUser._id);

    return newUser;
  }

  async getUserData(userId: string): Promise<UserDTO> {
    const userData = await this.userModel.findById(userId, {
      _id: false,
      email: true,
      firstName: true,
      discordUsername: true,
    });

    return userData;
  }
}
