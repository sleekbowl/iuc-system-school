import { Injectable } from '@angular/core';
import * as io from 'socket.io-client'
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ChatService {

  public socket = io('http://localhost:3000');

  constructor(
    public _usuarioService: UsuarioService, public http: HttpClient
  ) {
  };

  cargarConversacion(){
    let url = URL_SERVICIOS + '/chat/found/' + this._usuarioService.usuario._id;
    console.log(url);
    return this.http.get( url ).map( (resp:any) => resp.conversations);
  }
    


}