import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Materia } from '../../models/materia.model';

@Injectable()
export class MateriaService {

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) {

  }
  cargarMaterias( grupo: string ) {

    let url = URL_SERVICIOS + '/materia/search/';

    return this.http.post( url, {grupo:grupo})
              .map( (resp: any) => resp.materias );

  }
  borrarMatricula( id: string ) {

    let url = URL_SERVICIOS + '/materia/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
              .map( resp => {
                swal( 'Materia Borrada', 'Materia borrado correctamente', 'success' );
                return resp;
              });

  }
  guardarMateria( materia: Materia ) {

    let url = URL_SERVICIOS + '/materia';

    if ( materia._id ) {
      // actualizando
      url += '/' + materia._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, materia )
                .map( (resp: any) => {
                  return resp.matricula._id;

                });

    }else {
      // creando
      url += '/new' + materia._id;
      url += '?token=' + this._usuarioService.token;
      // if (idUser._id === null){
    //   matricula.vinculada = true;
    // }
       
      return this.http.post( url, materia )
              .map( (resp: any) => {
                return resp.materia;
              });
    }

  }
  crearMateria(){
    let url = URL_SERVICIOS + '/materia/new';
       
      return this.http.post( url, {} )
              .map( (resp: any) => {
                return resp.materia;
              });
    }
  }

}
