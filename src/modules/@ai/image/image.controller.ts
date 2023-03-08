import { Controller, Get, Query, UseGuards } from '@nestjs/common';

import { ImageService } from './image.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('/openai/image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getImageGeneration(@Query('prompt') prompt: string) {
    return this.imageService.generateImage(prompt, '512x512');
  }
}
