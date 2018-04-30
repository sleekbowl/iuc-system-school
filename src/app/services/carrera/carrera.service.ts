import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';

import { Carrera } from '../../models/carrera.model';

import swal from 'sweetalert';

@Injectable()
export class CarreraService {

  totalCarreras: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarCarreras() {

    let url = URL_SERVICIOS + '/carrera';
    return this.http.get( url )
              .map( (resp: any) => {
                this.totalCarreras = resp.total;
                return resp.carreras;
              });

  }

  obtenerCarrera( id: string ) {

    let url = URL_SERVICIOS + '/carrera/' + id;
    return this.http.get( url )
                .map( (resp: any) => resp.carreras );

  }

  borrarCarrera( id: string ) {

    let url = URL_SERVICIOS + '/carrera/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
                .map( resp => swal('Carrera Borrada', 'Eliminado correctamente', 'success') );

  }

  crearCarrera( carrera: Carrera ) {

    let url = URL_SERVICIOS + '/carrera';
    url += '?token=' + this._usuarioService.token;

    return this.http.post( url, carrera )
              .map( (resp: any) => {
                resp.carrera;
                swal('Carrera creado', carrera.nombre, 'success' );
              });

  }

  actualizarCarrera( carrera: any ) {

    let url = URL_SERVICIOS + '/carrera/' + carrera._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put( url, carrera )
              .map( (resp: any) => {

                swal('Carrera Actualiada', carrera.nombre, 'success');
                return resp.carrera;
              });

  }

}