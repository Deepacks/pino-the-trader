import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Analytics, AnalyticsDocument } from 'src/schemas/analytics.schema';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel(Analytics.name)
    private readonly analyticsModel: Model<AnalyticsDocument>,
  ) {}

  async createAnalytics(userId: Types.ObjectId) {
    await this.analyticsModel.create({ user: userId, lastLogin: new Date() });
  }
}
