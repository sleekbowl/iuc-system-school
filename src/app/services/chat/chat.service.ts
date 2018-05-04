import { Injectable } from '@angular/core';
import * as io from 'socket.io-client'

@Injectable()
export class ChatService {

  public socket = io('http://localhost:3000');

  constructor() {
    
  };

}
