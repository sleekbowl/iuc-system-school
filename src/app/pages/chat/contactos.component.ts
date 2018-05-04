import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UsuarioService } from '../../services/service.index';
import { URL_SERVICIOS } from '../../config/config';


@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css']
})
export class ContactosComponent implements OnInit {

  contactos: any;

  constructor( 
    public _usuarioService:UsuarioService,
    public http: HttpClient
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
      return;
    }
    console.log(nombre);
    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + nombre;

    this.http.get( url )
        .subscribe( (resp: any) => {
          this.contactos = resp.alumnos;
        });
  }

}
