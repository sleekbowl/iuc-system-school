import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';

//Pipes
import { DatePipe } from '@angular/common';

const moment = require('moment');

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  edit: boolean = false;

  imagenSubir: File;
  imagenTemp: string;

  constructor(
    public _usuarioService: UsuarioService
  ) {
    this.usuario = this._usuarioService.usuario;
    this._usuarioService.obtenerUsuario( this.usuario._id )
                        .subscribe( data => {
                          this.usuario = data;
                          this.usuario.fechaNacimiento = moment( this.usuario.fechaNacimiento )
                          .format("YYYY-MM-DD").toString();
                          console.log( this.usuario );
                        });
  }

  ngOnInit() {
  }

  guardar( usuario: Usuario ) {

    this.usuario.nombre = usuario.nombre;
    if ( !this.usuario.google ) {
      this.usuario.email = usuario.email;
    }

    this._usuarioService.actualizarUsuario( this.usuario )
                .subscribe();

  }

  editar(){
    window.scrollTo(0, 450);
    this.edit = true;
  }
  cancelar(){
    this.edit = false;
  }

  actualizarUsuario( ){
    this._usuarioService.actualizarUsuario( this.usuario )
        .subscribe( res => console.log("Se acualizo correctamente"));
  }

  seleccionImage( archivo: File ) {

    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }

    if ( archivo.type.indexOf('image') < 0 ) {
      swal('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result;

  }

  cambiarImagen() {

    this._usuarioService.cambiarImagen( this.imagenSubir, this.usuario._id );

  }

}
