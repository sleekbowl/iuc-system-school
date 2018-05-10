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

  conversations = new Array;
  contactos = new Array;

  conversationsEmpty: boolean = false;
  search:boolean = true;
  searchContac: boolean = false;

  constructor( 
    public _chatService: ChatService, public _usuarioService: UsuarioService,
    public http:HttpClient
   ) {
     this.cargarConversations();
  }

  ngOnInit() {
  }
  
  cargarConversations(){
    this._chatService.cargarConversacion().subscribe(data =>{
      this.search = false;
      this.conversations = data;
      if( this.conversations === null ){
        this.conversationsEmpty = true;
      }else{
        
      }
    })
  }

  buscarContacto( nombre:string ){
    if( nombre.length === 0 ){
      this.searchContac = false;
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

  cargarConversation( idReservation:string ){
  console.log(idReservation);
  }

}
