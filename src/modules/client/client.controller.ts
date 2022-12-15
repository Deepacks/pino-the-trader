import { Body, Controller, Post } from '@nestjs/common';

import { ClientService } from './client.service';
import { EmbedDto } from './dto/embed-dto.type';

@Controller('create')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Post('embed')
  async createEmbed(@Body() embedDto: EmbedDto) {
    return this.clientService.createEmbed(embedDto);
  }
}
