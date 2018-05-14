import { Injectable } from '@angular/core';
import * as io from 'socket.io-client'
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Usuario } from '../../models/usuario.model';


@Injectable()
export class ChatService {

  public socket = io('http://localhost:3000');
  public conversations:any = new Array;
  public conversationFull:any;
  public contactos = new Array;
  public toUser:string = "";
  public conversationsEmpty: boolean = false;
  public search:boolean = true;
  public searchContac: boolean = false;
  public newConversation: boolean = false;
  public selection: boolean = false;
  public receptor:string = "";

  constructor(
    public _usuarioService: UsuarioService, public http: HttpClient
  ) {
    this.cargarConversations();
  };

  cargarConversations(){
    let id  = this._usuarioService.usuario._id;
    let url = URL_SERVICIOS + '/chat/user';
    return this.http.post( url, {identificacion:id}).subscribe( (resp:any) =>{
      this.conversations = resp.conversations;
      console.log(this.conversations);
      this.search = false;
      if( this.conversations.length === 0 ){
        this.conversationsEmpty = true;
      }else{
        
      }
    });
  };

  cargarConversation( id:string ){
    this.receptor = id;
    let url = URL_SERVICIOS + '/chat/conversation/' + id;
    return this.http.get( url ).subscribe( (resp:any) =>{
      this.conversationFull = resp.conversation;
      console.log("Conversacion full");
      console.log( this.conversationFull );
      if( this.conversationFull.length === 0 ){
        this.newConversation = true;
      }
      this.selection = true;
    })
  }

  busquedaConversation( idBusqueda: string ){
    console.log(idBusqueda);
    // this.toUser = idBusqueda;
    // if(this.conversations.length === 0){
    //   this.newConversation = true;
    //   this.cargarConversation( idBusqueda );
    // }
    // for (let i = 0; i < this.conversations.length; i++) {
    //   let count:number = this.conversations[i].participants.length; 
    //   for (let j = 0; j < count; j++) {    
    //     if( this.conversations[i].participants[j] === idBusqueda){
    //       this.newConversation = false;
    //       this.cargarConversation( this.conversations[i]._id );
    //       return;
    //     }  
    //   }
    // }
  }

  buscarContacto( nombre:string ){
    if( nombre.length === 0 ){
      this.searchContac = false;
      if( this.conversations.length === 0 ){
        this.conversationsEmpty = true;
      }
    }
    console.log(nombre);
    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + nombre;

    this.http.get( url )
        .subscribe( (resp: any) => {
          this.contactos = resp.usuarios;
          this.conversationsEmpty = false;
          this.searchContac = true;
        });
  }

  enviarMensaje( mensaje:string ){
    let receptor:string = this.receptor;
    let user = this._usuarioService.usuario._id;
    if( this.selection === false ){
      console.error("Favor de seleccionar una conversacion o contacto");
    }else{
      if( this.newConversation === true ){
        console.log("Este es el mensaje: "+mensaje)
        console.log("Este es el usuario que lo envio: "+user);
        console.log("Este es el receptor: "+receptor);
        let url = URL_SERVICIOS + '/chat/conversation/'+receptor;

        this.http.post( url, {mensaje, user} ).subscribe( (resp:any) => {
          console.log(resp);
        });
      }else{
        console.log("Se va a enviar el mensaje: "+mensaje)
      }
    }
  }

}