import { Controller, Get, Req, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GuardedRequest } from 'src/types/guardedRequest.type';
import { UserService } from './user.service';
import { UserDTO } from './dto/user-dto.typ';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getUserData(@Req() req: GuardedRequest): Promise<UserDTO> {
    return this.userService.getUserData(req.user.userId);
  }
}
