import { Component, OnInit } from '@angular/core';
import { UsuarioService, ChatService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;

  constructor(
    public _usuarioService: UsuarioService,
    public _chatService: ChatService,
    public router: Router
  ) { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
  }

  buscar( termino: string ) {
    this.router.navigate(['/busqueda', termino ]);
  }

  cerrarSesion(){
    this._chatService.left();
    this._usuarioService.logout();
  }

}
