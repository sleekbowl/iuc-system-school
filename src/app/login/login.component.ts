import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;

  auth2: any;

  constructor(
    public router: Router,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';
    if ( this.email.length > 1 ) {
      this.recuerdame = true;
    }

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

      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;

      this._usuarioService.loginGoogle( token )
              .subscribe( (data) => {
                console.log("Todo bn aqui");
                console.log(data)
                switch (data.matricula.role) {
                  case 'ADMIN_ROLE':
                    window.location.href = '#/dashboard';
                    break;
                  case 'ALUMNO_ROLE':
                  window.location.href = '#/dashboardS';
                    break
                  case 'MAESTRO_ROLE':
                    window.location.href = '#/dashboardT';
                    break;
                }
              });

    });

  }


  ingresar( forma: NgForm) {

    if ( forma.invalid ) {
      return;
    }

    let usuario = new Usuario(null, forma.value.email, forma.value.password );

    this._usuarioService.login( usuario, forma.value.recuerdame )
                  .subscribe( correcto => {
                    switch (correcto.matricula.role) {
                      case 'ADMIN_ROLE':
                        window.location.href = '#/dashboard';
                        break;
                      case 'ALUMNO_ROLE':
                      window.location.href = '#/dashboardS';
                        break
                      case 'MAESTRO_ROLE':
                        window.location.href = '#/dashboardT';
                        break;
                    }
                  });

    // this.router.navigate([ '/dashboard' ]);

  }

}
