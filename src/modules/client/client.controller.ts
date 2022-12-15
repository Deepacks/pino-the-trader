import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ClientService } from './client.service';
import { EmbedDto } from './dto/embed-dto.type';

@Controller('create')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @UseGuards(JwtAuthGuard)
  @Post('embed')
  async createEmbed(@Body() embedDto: EmbedDto) {
    return this.clientService.createEmbed(embedDto);
  }
}
