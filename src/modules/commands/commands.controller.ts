import { Controller, Get } from '@nestjs/common';
import { CommandsService } from './commands.service';

@Controller('commands')
export class CommandsController {
  constructor(private commandsService: CommandsService) {}

  @Get('register')
  async registerCommand() {
    return this.commandsService.registerCommand();
  }
}
