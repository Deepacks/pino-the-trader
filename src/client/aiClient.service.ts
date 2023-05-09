import { Injectable } from '@nestjs/common'
import { Client, Dispatcher } from 'undici'
import { ChatCompletionRequestMessage } from './types/openAi.types'

@Injectable()
export class AiClientService {
  private _undiciClient: Client

  constructor() {
    this._undiciClient = new Client('https://ai.vlad-hub.com')
  }

  private async _post(
    requestOptions: Omit<Dispatcher.RequestOptions, 'headers' | 'method'>,
  ) {
    const response = await this._undiciClient.request({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      ...requestOptions,
    })
    return response.body.text()
  }

  async getMarvResponse(chat: ChatCompletionRequestMessage[]): Promise<string> {
    return this._post({
      path: '/text/chat/marv',
      body: JSON.stringify(chat),
    })
  }

  async getImageCreation(prompt: string): Promise<string> {
    return await this._post({
      path: '/image/create',
      body: JSON.stringify({ prompt }),
    })
  }
}
