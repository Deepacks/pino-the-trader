import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Analytics, AnalyticsDocument } from 'src/schemas/analytics.schema';
import { AnalyticInteraction } from './types/analyticInteraction.types';
import { INTERACTION_NAME2KEY } from './constants/interactionName2Key.constant';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel(Analytics.name)
    private readonly analyticsModel: Model<AnalyticsDocument>,
  ) {}

  async createAnalytics(userId: Types.ObjectId) {
    await this.analyticsModel.create({ user: userId, lastLogin: new Date() });
  }

  async updateLastLogin(userId: Types.ObjectId) {
    await this.analyticsModel.findOneAndUpdate(
      { user: userId },
      {
        lastLogin: new Date(),
      },
    );
  }

  async registerInteraction(
    userId: Types.ObjectId,
    interaction: AnalyticInteraction,
    fromDiscord = false,
  ) {
    await this.analyticsModel.findOneAndUpdate(
      { [fromDiscord ? 'discordId' : 'user']: userId },
      { $inc: { [`openAiData.${INTERACTION_NAME2KEY.get(interaction)}`]: 1 } },
    );
  }
}
