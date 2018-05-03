import { Component, OnInit } from '@angular/core';
import { ModalUploadService } from '../../../components/modal-upload/modal-upload.service';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { GrupoService } from '../../../services/grupo/grupo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Grupo } from '../../../models/grupo.model';

declare var swal: any;
import * as moment from 'moment';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styles: []
})
export class GruposComponent implements OnInit {

  cargando: boolean = true;
  nothing:boolean = true;
  busqueda:boolean = false;
  selec:boolean = false;
  desde: number = 0;
  totalRegistros: number = 0;
  grupos: Grupo[];
  // Variables de busqueda
  tipoBusqueda = ['Año','Carrera','Tipo'];
  years = [];
  tipo = ['Semestre', 'Cuatrimeste'];
  carreras = [];
  vBusqueda:string = "";

  constructor(
    public _modalUploadService: ModalUploadService,
    public _usuarioService: UsuarioService,
    public _grupoService: GrupoService,
    public router: Router,
  ) {
    this.cargarGrupos();
    // Obtenemos el año actual y creamos una matriz con los 8 años descendientes
    this.years[0] = moment().get('year');        
    for (let index = 1; index < 8; index++) {
      this.years[index] = this.years[index - 1] - 1;
    }
  }

  ngOnInit() {
  }
  
  cambioBusqueda( event ){
    switch (event) {
      case 'Año':
        this.vBusqueda = "Año";
        this.selec = true;
        break;
      case 'Carrera':
      this.vBusqueda = "Carrera";
      this.selec = true;
        break;
      case 'Tipo':
      this.vBusqueda = "Tipo";
      this.selec = true;      
        break;
      default:
        break;
    }
  }
  cambioYear( termino ){
    let busqueda = new Array;
    busqueda = [];
    this.cargando = true;
    var terminoNumber:number = parseInt(termino);
    console.log(terminoNumber);
    for (let i = 0; i < this.grupos.length; i++) {
      if( this.grupos[i].year == terminoNumber ){
        busqueda.push(this.grupos[i]);
      }
    }
    console.log(busqueda);
    this.grupos = busqueda;
    this.cargando = false;
    if ( this.grupos.length === 0 ) {
      this.nothing = true;
    }
  }
  
  mostrarModal( id: string ) {
    this._modalUploadService.mostrarModal( 'usuarios', id );
  }

  cargarGrupos( ) {

    this._grupoService.cargarGrupos( this.desde )
              .subscribe( (resp: any) => {
                this.totalRegistros = resp.total;
                this.grupos = resp.grupos;
                this.cargando = false;
                if( this.totalRegistros === 0 ){
                  this.nothing = true;
                }else{
                  this.nothing = false;
                }
              });

  }

  cambiarDesde( valor: number ) {
    let desde = this.desde + valor;

    if ( desde >= this.totalRegistros ) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarGrupos( );

  }

  buscarGrupo( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarGrupos();
      this.busqueda = false;
      return;
    }

    this.cargando = true;

    this._grupoService.buscarGrupos( termino )
            .subscribe( (data: any) => {
              this.grupos = data.grupos;
              console.log(this.grupos);
              this.cargando = false;
              this.busqueda = true;
            });

  }

  buscarGrupoInterno( termino:string ){

    if ( termino.length <= 0 ) {
      this.cargarGrupos();
      return;
    }

    this.cargando = true;
    if( this.vBusqueda === 'Año' ){
      var terminoNumber:number = parseInt(termino);
    }
    for (let i = 0; i < this.grupos.length; i++) {
      if( this.grupos[i].year == terminoNumber ){
        this.grupos = [this.grupos[i]];
        return
      }
    }
    this.cargando = false;
  }

  borrarGrupo( grupo: Grupo ) {


    swal({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a ' + grupo.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then( borrar => {

      if (borrar) {

        this._grupoService.borrarGrupo( grupo._id )
                  .subscribe( borrado => {
                      this.cargarGrupos();
                  });

      }

    });

  }

  direccionarGrupo( id: string ) {
    this.router.navigate(['/grupo', id ]);
  }

}
