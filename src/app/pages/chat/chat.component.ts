import { Component, OnInit } from '@angular/core';
import { ChatService, UsuarioService } from '../../services/service.index';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  contactos = new Array;

  constructor( 
    public _chatService: ChatService, public _usuarioService: UsuarioService,
    public http:HttpClient
   ) {
     this.cargarContactos();
  }

  ngOnInit() {
  }
  
  cargarContactos(){
    this._usuarioService.cargarUsuarios().subscribe( resp => {
      console.log(resp);
      this.contactos = resp['usuarios'];
    });
  }

  buscarContacto( nombre:string ){
    if( nombre.length === 0 ){
      this.cargarContactos();
    }
    console.log(nombre);
    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + nombre;

    this.http.get( url )
        .subscribe( (resp: any) => {
          this.contactos = resp.usuarios;
          console.log(resp);
        });
  }

  cargarConversation( idReservation:string ){
  console.log(idReservation);
  }

}
