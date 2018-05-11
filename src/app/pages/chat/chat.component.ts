import { Component, OnInit } from '@angular/core';
import { ChatService, UsuarioService } from '../../services/service.index';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  
  mensaje:string = "";

  constructor( 
    public _chatService: ChatService, public _usuarioService: UsuarioService,
    public http:HttpClient
   ) {
  }

  ngOnInit() {
  }

  detecEnter( code:string ){
    if( code === "Enter" ){
      this._chatService.enviarMensaje( this.mensaje );
      this.mensaje = "";
    }
  }

}
