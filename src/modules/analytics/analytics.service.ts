import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { INTERACTION_NAME2KEY } from './constants/interactionName2Key.constant';
import { Analytics, AnalyticsDocument } from 'src/schemas/analytics.schema';
import { AnalyticInteraction } from './types/analyticInteraction.types';
import { UserAnalyticsDto } from './dto/userAnalytics-dto.type';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel(Analytics.name)
    private readonly analyticsModel: Model<AnalyticsDocument>,
  ) {}

  async createAnalytics(userId: Types.ObjectId, discordId?: string) {
    await this.analyticsModel.create({
      user: userId,
      discordId,
      lastLogin: new Date(),
    });
  }

  async updateLastLogin(userId: Types.ObjectId) {
    await this.analyticsModel.findOneAndUpdate(
      { user: userId },
      {
        lastLogin: new Date(),
      },
    );
  }

  async updateDiscordId(userId: Types.ObjectId, discordId: string) {
    await this.analyticsModel.findOneAndUpdate(
      { user: userId },
      {
        lastLogin: new Date(),
        discordId,
      },
    );
  }

  async registerInteraction(
    userId: Types.ObjectId | string,
    interaction: AnalyticInteraction,
    fromDiscord = false,
  ): Promise<boolean> {
    const analyticsUser = await this.analyticsModel.findOne({
      [fromDiscord ? 'discordId' : 'user']: userId,
    });

    if (!analyticsUser) return false;

    await analyticsUser.updateOne({
      $inc: { [`openAiData.${INTERACTION_NAME2KEY.get(interaction)}`]: 1 },
    });

    return true;
  }

  async getUserAnalyticsData(
    userId: string,
    isAdmin: boolean,
    requestedUser?: string,
  ): Promise<UserAnalyticsDto> {
    if (requestedUser && userId !== requestedUser && !isAdmin) {
      throw new HttpException('User is not admin', HttpStatus.UNAUTHORIZED);
    }

    const userAnalytics = await this.analyticsModel.findOne(
      {
        user: requestedUser ?? userId,
      },
      { _id: false, lastLogin: true, openAiData: true },
    );

    return userAnalytics;
  }
}
