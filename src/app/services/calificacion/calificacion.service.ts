import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Grupo } from '../../models/grupo.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { UsuarioService } from '../service.index';

@Injectable()
export class CalificacionService {

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService,
  ) {

  }

  crearCalificacion( ) {
    let url = URL_SERVICIOS + '/calificaciones/new';
      // creando
      console.log("Creando el Grupo");
      url += '?token=' + this._usuarioService.token;
       
      return this.http.post( url, {} )
              .map( (resp: any) => {
                return resp.calificacion._id;
              });
    

  }
}
