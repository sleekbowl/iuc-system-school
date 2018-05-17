import { Component, OnInit, ViewChild } from '@angular/core';
import { ChatService, UsuarioService } from '../../services/service.index';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';


import * as io from 'socket.io-client'

import * as moment from 'moment';
import { Mensaje } from '../../models/mensaje.model';


let momento = moment()


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  elemento: any;

  public socket = io('http://localhost:3000');
  public conversations:any = new Array;
  public conversationFull:any = new Array;
  public idConversation: string = "";
  public contactos = new Array;
  public toUser:string = "";
  public conversationsEmpty: boolean = false;
  public search:boolean = true;
  public searchContac: boolean = false;
  public newConversation: boolean = false;
  public selection: boolean = false;
  public receptor:string = "";
  
  public config: PerfectScrollbarConfigInterface = {};
  
  mensaje:string = "";

  constructor( 
    public _chatService: ChatService, public _usuarioService: UsuarioService,
    public http:HttpClient 
   ) {
     this.cargarConversations();
     this._chatService.mensajeRecibido().subscribe(data => {
      console.log("Un nuevo usuario envio un mensaje");
      console.log(data);
    });
  }
  
  ngOnInit() {
    this.elemento = document.getElementById('chatScroll');
  }

  cargarConversations(){
    let id  = this._usuarioService.usuario._id;
    this._chatService.cargarConversations( id ).subscribe( (resp:any) =>{
      this.conversations = resp.conversations;
      this.search = false;
      console.log(this.conversations);
      if( this.conversations.length === 0 ){
        this.conversationsEmpty = true;
      }else{

      }
    });    
  }

  busquedaConversation( idBusqueda :string){
    this.receptor = idBusqueda;

    this._chatService.busquedaConversation( idBusqueda ).subscribe( (resp:any) =>{
      this.conversationFull = resp.conversation;
      if( this.conversationFull.length === 0 ){
        this.newConversation = true;
        this.selection = true;
      }else{
        for (let index = 0; index < this.conversationFull.length; index++) {
          this.conversationFull[index].send = moment( this.conversationFull[index].createdAt ).hour()+":"+moment( this.conversationFull[index].createdAt ).minute()
        }
        this.selection = true;
        this.idConversation = idBusqueda;
        this.socket.emit('inside', {conversationId:this.idConversation});
        this.newConversation = false;
      }
      setTimeout( ()=>{
        this.elemento.scrollTop = this.elemento.scrollHeight;
      },20);
    });
  }
  
  busquedaConversationContac( id:string ){
    this.selection = true;
    this.receptor = id;
    this._chatService.busquedaConversationContac( id ).subscribe( (resp:any) =>{
      let conversation = resp.conversations;
      console.log("Conversacion full");
      console.log( conversation );
      if( conversation.length === 0 ){
        this.newConversation = true;
      }else{
        this.busquedaConversation( conversation[0]._id );
      }
      
    });
  }

  buscarContacto( nombre:string ){
    if( nombre.length === 0 ){
      this.searchContac = false;
      if( this.conversations.length === 0 ){
        this.conversationsEmpty = true;
      }else{
        this.conversationsEmpty = false;
      }
    }
    this._chatService.buscarContacto( nombre ).subscribe( (resp: any) => {
      this.contactos = resp.usuarios;
      this.conversationsEmpty = false;
      this.searchContac = true;
    });
  }

  detecEnter( code:string ){
    if( code === "Enter" ){
      let send = this.mensaje.slice(0, -1);
      this.enviarMensaje( send );
      this.mensaje = "";
    }
  }

  enviarMensaje( body:string ){
    if( this.selection === false ){
      console.error("Favor de seleccionar una conversacion o contacto");
    }else{
      if( this.newConversation === true ){
        let idNewConversation:string = "";
        console.log("Nueva Conversacion");
        this._chatService.nuevaConversacion(this.receptor,body,this._usuarioService.usuario._id)
        .subscribe( (resp:any) => {
          idNewConversation = resp.idConversation;
          console.log(resp);
          this.socket.emit('inside', {idConversation:resp.idConversation});
        });
      }else{
        console.log("Conversacion iniciada");
        this._chatService.enviarMensaje(body, this.idConversation,this._usuarioService.usuario._id,this._usuarioService.usuario.nombre)
        .subscribe((data:any) =>{
          console.log(data);
          this.socket.emit('message', {sala:this.idConversation ,nombre: data.nombre, img : this._usuarioService.usuario.img, mensaje: data.mensaje.body, hora: data.mensaje.createdAt});
        });
      }
    }
  }

}
