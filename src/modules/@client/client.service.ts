import { Injectable } from '@nestjs/common';
import { Client } from 'undici';

@Injectable()
export class ClientService {
  static headers: { 'Content-Type': 'application/json' };
  private _undiciClient: Client;

  get undiciClient() {
    return this._undiciClient;
  }

  constructor() {
    this._undiciClient = new Client('https://vlad-hub.com/undici/api');
  }
}
