import { Controller, Get, OnApplicationBootstrap } from '@nestjs/common';

import { BotCommandsService } from './botCommands.service';

@Controller('commands')
export class CommandsController implements OnApplicationBootstrap {
  constructor(private commandsService: BotCommandsService) {}

  onApplicationBootstrap() {
    // this.commandsService.registerCommands();
  }

  @Get('register')
  async registerCommands() {
    return this.commandsService.registerCommands();
  }
}
