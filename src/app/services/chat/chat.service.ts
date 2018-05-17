import { Injectable } from '@angular/core';
import * as io from 'socket.io-client'
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Usuario } from '../../models/usuario.model';

import * as moment from 'moment';
import { Mensaje } from '../../models/mensaje.model';
let momento = moment()


@Injectable()
export class ChatService {

  public socket = io('http://localhost:3000');
  public conversations:any = new Array;
  // public conversationFull:any = new Array;
  public idConversation: string = "";
  // public contactos = new Array;
  // public toUser:string = "";
  // public conversationsEmpty: boolean = false;
  // public search:boolean = true;
  // public searchContac: boolean = false;
  // public newConversation: boolean = false;
  // public selection: boolean = false;
  public receptor:string = "";

  constructor(
    public _usuarioService: UsuarioService, public http: HttpClient
  ) {
    this.join();
    this.nuevoUsuarioIngresado();
    this.usuarioDesconectado();
  };

  join(){
    let data: Object = new Object;
    data['user'] = this._usuarioService.usuario._id;
    this.socket.emit('join', data);
  }

  nuevoUsuarioIngresado(){
    let observable = new Observable<{user:string}>(observer =>{
      this.socket.on('joined', (data)=>{
        observer.next(data);
      })
      return () => {this.socket.disconnect()}
    }).subscribe(data => {
      console.log("Este usuario se acaba de conectar:"+data.user);
      for (let i = 0; i < this.conversations.length; i++) {
        for (let j = 0; j < this.conversations[i].participantsId.length; j++) {
          if( this.conversations[i].participantsId[j]._id === data.user ){
            this.conversations[i]['online'] = true;
            console.log("Se encontro en tu base de datos el usuario");
            return;
          } 
        }
      }
    });
  }

  usuarioDesconectado(){
    let observable = new Observable<{user:string}>(observer =>{
      this.socket.on('left', (data)=>{
        observer.next(data);
      })
      return () => {this.socket.disconnect()}
    }).subscribe(data => {
      console.log("Este usuario se acaba de conectar:"+data.user);
      for (let i = 0; i < this.conversations.length; i++) {
        for (let j = 0; j < this.conversations[i].participantsId.length; j++) {
          if( this.conversations[i].participantsId[j]._id === data.user ){
            this.conversations[i]['online'] = false;
            console.log("Se encontro en tu base de datos el usuario y se desconecto");
            return;
          } 
        }
      }
    });
  }

  cargarConversations( idUsuario:string ){
    // let id  = this._usuarioService.usuario._id;
    let url = URL_SERVICIOS + '/chat/user';
    return this.http.post( url, {identificacion:idUsuario});
  };

  busquedaConversationContac( id:string ){
    let url = URL_SERVICIOS + '/chat/user';
    return this.http.post( url,{identificacion:id} );
  }

  busquedaConversation( idBusqueda: string ){
    let url = URL_SERVICIOS + '/chat/conversation/' + idBusqueda;

    return this.http.get( url );
  }

  buscarContacto( nombre:string ){
    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + nombre;

    return this.http.get( url );
  }

  enviarMensaje( body:string, idConversation:string, usuarioId:string, nombre:string ){

    let mensaje: Mensaje = new Mensaje(idConversation,body,usuarioId,nombre);
    let receptor:string = this.receptor;
    let user = this._usuarioService.usuario._id;
    let data: Object = new Object();
    data['user'] = this._usuarioService.usuario.nombre;
    data['img'] = this._usuarioService.usuario.img;
    data['mensaje'] = body;
    data['conversationId'] = this.idConversation;

    let url = URL_SERVICIOS + '/chat/sendMensaje';
        return this.http.post( url, {mensaje})
  }

  mensajeRecibido(){
    let observable = new Observable<{user:String, img:String, mensaje:string, hora:string}>(observer=>{
      this.socket.on('new message', (data)=>{
          observer.next(data);
      });
      return () => {this.socket.disconnect();}
  });

  return observable;
  }

  nuevaConversacion( receptor:string, mensaje:string, userId:string ){
    let url = URL_SERVICIOS + '/chat/conversation/'+receptor;
        return this.http.post( url, {mensaje: mensaje, user:userId} )
        // .subscribe( (resp:any) => {
        //   idNewConversation = resp.idConversation;
        //   console.log(resp);

        // });
  }

}