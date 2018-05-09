import { Injectable } from '@angular/core';
import * as io from 'socket.io-client'
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

@Injectable()
export class ChatService {

  public socket = io('http://localhost:3000');

  constructor(
  ) {
    
  };


}