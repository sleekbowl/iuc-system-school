import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import swal from 'sweetalert';


import { UsuarioService, MatriculaService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';
import {  } from '../services/matricula/matricula.service';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;
  auth2: any;
  matricula: string = "";
  matriculaDB: any;
  validator: boolean = false;
  usuario: any;

  constructor(
    public _usuarioService: UsuarioService,
    public _matriculaService: MatriculaService,
    public router: Router
  ) { }

  sonIguales( campo1: string, campo2: string ) {

    return ( group: FormGroup ) => {

      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if ( pass1 === pass2 ) {
        return null;
      }

      return {
        sonIguales: true
      };

    };

  }


  ngOnInit() {
      init_plugins();
      this.googleInit();

      this.forma = new FormGroup({
        nombre: new FormControl( null , Validators.required ),
        correo: new FormControl( null , [Validators.required, Validators.email] ),
        password: new FormControl( null , Validators.required ),
        matricula: new FormControl( null , Validators.required )
        // condiciones: new FormControl( false )
      });


      // this.forma.setValue({
      //   nombre: 'Test ',
      //   correo: 'test@test.com',
      //   password: '123456',
      //   password2: '123456',
      //   condiciones: true
      // });

  }

  googleInit() {

    gapi.load('auth2', () => {

      this.auth2 = gapi.auth2.init({
        client_id: '1082968803821-bb09s4ur2hnsd8ksu6vp512navfeuut6.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin( document.getElementById('btnGoogle') );

    });


  }

  attachSignin( element ) {

    this.auth2.attachClickHandler( element, {}, (googleUser) => {

      if( this.matricula.length < 9 && !this.validator === true){
        swal({
          icon: "error",
          title: "Ingresar matricula valida"
        });
        return;
      }
      // let profile = googleUser.getBasicProfile();
      
      let token = googleUser.getAuthResponse().id_token;

      this._usuarioService.registerGoogle( token, this.matriculaDB )
              .subscribe( resp => {
                console.log( resp );
                if( resp.valid === true ){
                  this.matriculaDB.usuario = resp.usuario._id;
                  this.matriculaDB.vinculada = true;
                  this._matriculaService.vincularMatricula( this.matriculaDB ).subscribe( matricula =>{
                    window.location.href = '#/dashboard';
                    return true;
                  })
                }
                return true;
              });

    });

  }


  registrarUsuario() {

    if ( this.forma.invalid ) {
      return;
    }
    if( this.matricula.length < 9 && !this.validator){
      swal({
        icon: "error",
        title: "La matricula no es valida"
      });
      return;
    }

    // if ( !this.forma.value.condiciones ) {
    //   swal('Importante', 'Debe de aceptar las condiciones', 'warning');
    //   return;
    // }


    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password,
      this.forma.value.matricula
    );

    this._usuarioService.crearUsuario( usuario, this.matriculaDB._id )
              .subscribe( resp => {
                this.matriculaDB.usuario = resp._id;
                this.matriculaDB.vinculada = true;
                this._matriculaService.vincularMatricula( this.matriculaDB )
                .subscribe( () => {
                  
                })
                this.router.navigate(['/login'])
              });


  }

  validatorMatricula( event:any){
    if( this.matricula.length >= 9 ){
      this.matricula = event.target.value.toString();
      this._matriculaService.buscarMatricula( this.matricula )
      .subscribe( resp => {
        try {
          this.matriculaDB = resp[0].vinculada;
          console.log( this.matriculaDB );
          if(!this.matriculaDB){
            console.log("Se puede usar la matricula ingresada");
            this.validator = true;
            console.log( "Matricula :");
            this.matriculaDB = new Object(resp[0]);
            console.log( this.matriculaDB )
          }else{
            console.error("La matricula ya fue vinculada");
            this.validator = false;
          }
        } catch (error) {
          console.error("La matricula no existe");
          this.validator = false;
        }
      });
      
    }else{
      this.validator = false;
    }
    // let prueba: string = event.target.value.toString();
    // console.log(prueba);
    // console.log(prueba.length);
    // console.log(event.target.length);
  }

}
