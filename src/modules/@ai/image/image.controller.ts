import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';

import { ImageService } from './image.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GuardedRequest } from 'src/types/guardedRequest.type';

@Controller('/openai/image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getImageGeneration(
    @Query('prompt') prompt: string,
    @Req() req: GuardedRequest,
  ) {
    return this.imageService.generateImage(
      { userId: req.user.userId },
      prompt,
      '512x512',
    );
  }
}
