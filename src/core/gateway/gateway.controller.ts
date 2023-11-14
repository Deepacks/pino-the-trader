import { Controller } from '@nestjs/common'
import { On, Once } from '@discord-nestjs/core'
import { Message, VoiceState } from 'discord.js'

import { GatewayService } from './gateway.service'

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Once('ready')
  async ready() {
    this.gatewayService.onReady()
  }

  @On('messageCreate')
  async messageCreate(message: Message) {
    this.gatewayService.onMessageCreate(message)
  }

  @On('voiceStateUpdate')
  async voiceStateUpdate(oldVoiceState: VoiceState, newVoiceState: VoiceState) {
    this.gatewayService.onVoiceStateUpdate(oldVoiceState, newVoiceState)
  }
}
