import { Controller, Get } from '@nestjs/common';
import { ClientService } from './client.service';

@Controller('create')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Get('embed')
  async createEmbed() {
    return this.clientService.createEmbed();
  }
}
