import { Injectable } from '@nestjs/common'
import { Client } from 'undici'
import { ChatCompletionRequestMessage } from './types/openAi.types'

@Injectable()
export class AiClientService {
  private _undiciClient: Client

  constructor() {
    this._undiciClient = new Client('https://ai.vlad-hub.com')
  }

  async getMarvResponse(chat: ChatCompletionRequestMessage[]): Promise<string> {
    const response = await this._undiciClient.request({
      path: '/text/chat/marv',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(chat),
    })

    return response.body.text()
  }
}
