import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from 'src/schemas/user.schema';
import { DiscordUserDTO } from 'src/auth/dto/discordUser-dto.type';
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

  async findByDiscordId(discordId: string): Promise<UserDocument> {
    return this.userModel.findOne({ discordId });
  }

  async registerUser(
    discordUser: DiscordUserDTO & { refreshToken: string },
  ): Promise<UserDocument> {
    const { id: discordId, email, username, refreshToken } = discordUser;

    const newUser = await this.userModel.create({
      discordId,
      email,
      username,
      refreshToken,
    });

    return newUser;
  }

  async getUserData(userId: string): Promise<UserDTO> {
    const { username, email } = await this.userModel.findById(userId, {
      username: true,
      email: true,
    });

    return { username, email };
  }
}
