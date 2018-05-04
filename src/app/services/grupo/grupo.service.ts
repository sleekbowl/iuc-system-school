import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Grupo } from '../../models/grupo.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable()
export class GrupoService {

  grupo: any;
  token: string;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService,
    public _subirArchivoService: SubirArchivoService
  ) { }

  guardarGrupo( grupo: Grupo ) {
    
    // if (idUser._id === null){
    //   matricula.vinculada = true;
    // }
    // matricula.usuario = idUser._id;

    let url = URL_SERVICIOS + '/grupo';

    if ( grupo._id ) {
      // actualizando
      console.log("Actualizando el Grupo")
      url += '/' + grupo._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, grupo )
                .map( (resp: any) => {
                  swal('Grupo Actualizado', resp.grupo.nombre, 'success');
                  return resp.grupo._id;

                });

    }else {
      // creando
      console.log("Creando el Grupo");
      url += '?token=' + this._usuarioService.token;
      // if (idUser._id === null){
    //   matricula.vinculada = true;
    // }
       
      return this.http.post( url, grupo )
              .map( (resp: any) => {
                swal('Grupo Creado', resp.grupo.nombre, 'success');
                return resp.grupo._id;
              });
    }

  }
  

  cambiarImagen( archivo: File, id: string ) {

    this._subirArchivoService.subirArchivo( archivo, 'grupo', id )
          .then( (resp: any) => {

            this.grupo.img = resp.grupo.img;
            swal( 'Imagen Actualizada', this.grupo.nombre, 'success' );

          })
          .catch( resp => {
            console.log( resp );
          }) ;

  }

  cargarGrupos( desde: number ) {

    let url = URL_SERVICIOS + '/grupo?desde=' + desde;
    return this.http.get( url );

  }

  cargarGrupo( id: string ) {

    let url = URL_SERVICIOS + '/grupo/' + id;
    return this.http.get( url )
              .map( (resp: any) => resp.grupo );

  }

  buscarGrupos( termino: string ) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/grupos/' + termino;
    return this.http.get( url )
                // .map( (resp: any) => {
                //   resp.grupos;
                //   console.log("Desde el servicio");
                //   console.log(resp)
                // });

  }


  borrarGrupo( id: string ) {

    let url = URL_SERVICIOS + '/grupo/' + id;
    url += '?token=' + this.token;

    return this.http.delete( url )
                .map( resp => {
                  swal('Grupo borrado', 'El grupo a sido eliminado correctamente', 'success');
                  return true;
                });

  }

  buscarUsuario( nombre:string ){
    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + nombre;
    return this.http.get( url )
                    .map( (resp:any) => resp.usuarios );
  }


  vincularAlumno( alumno:string, idGrupo ){
    let url = URL_SERVICIOS + '/grupo/' + idGrupo;
    url += '?token=' + this._usuarioService.token;
    console.log( alumno );
    return this.http.put( url, {alumno} )
                .map( (resp: any) => {
                  swal('Alumno vinculado', 'success' );
                  return resp.grupo;
                })
                .catch( err => {
                  swal( err.error.mensaje,  'error' );
                  return Observable.throw( err );
                });
  }

}
