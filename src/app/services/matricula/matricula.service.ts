import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Matricula } from '../../models/matricula.model';

import swal from 'sweetalert';

@Injectable()
export class MatriculaService {

  totalMatriculas: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarMatriculas() {

    let url = URL_SERVICIOS + '/matricula';

    return this.http.get( url )
              .map( (resp: any) => {

                this.totalMatriculas = resp.total;
                return resp.matriculas;
              });

  }

  cargarMatricula( id: string ) {

    let url = URL_SERVICIOS + '/matricula/' + id;

    return this.http.get( url )
              .map( (resp: any) => resp.matricula );

  }

  buscarMatriculas( termino: string ) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/matriculas/' + termino;
    return this.http.get( url )
                .map( (resp: any) => resp.matriculas );

  }
  buscarMatricula( termino: string ) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/matricula/' + termino;
    return this.http.get( url )
                .map( (resp: any) => resp.matricula );

  }

  borrarMatricula( id: string ) {

    let url = URL_SERVICIOS + '/matricula/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
              .map( resp => {
                swal( 'Matricula Borrada', 'Matricula borrado correctamente', 'success' );
                return resp;
              });

  }

  guardarMatricula( matricula: Matricula ) {
    
    // if (idUser._id === null){
    //   matricula.vinculada = true;
    // }
    // matricula.usuario = idUser._id;

    let url = URL_SERVICIOS + '/matricula';

    if ( matricula._id ) {
      // actualizando
      url += '/' + matricula._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, matricula )
                .map( (resp: any) => {
                  swal('Matricula Actualizada', resp.matricula.matricula, 'success');
                  return resp.matricula._id;

                });

    }else {
      // creando
      url += '?token=' + this._usuarioService.token;
      // if (idUser._id === null){
    //   matricula.vinculada = true;
    // }
       
      return this.http.post( url, matricula )
              .map( (resp: any) => {
                swal('Matricula Creada', resp.matricula.matricula, 'success');
                return resp.matricula._id;
              });
    }

  }

  vincularMatricula( matricula:Matricula ){
    let url = URL_SERVICIOS + '/matricula';
    url += '/' + matricula._id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put( url, matricula )
                .map( (resp: any) => {
                  return resp.matricula;
                });
  }
}
