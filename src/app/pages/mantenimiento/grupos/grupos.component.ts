import { Component, OnInit } from '@angular/core';
import { ModalUploadService } from '../../../components/modal-upload/modal-upload.service';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { GrupoService } from '../../../services/grupo/grupo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Grupo } from '../../../models/grupo.model';

declare var swal: any;

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styles: []
})
export class GruposComponent implements OnInit {

  cargando: boolean = true;
  desde: number = 0;
  totalRegistros: number = 0;
  grupos: Grupo[];
  tipoBusqueda = ['Año','Carrera','Tipo'];
  vBusqueda:string = "";
  nothing:boolean = true;
  busqueda:boolean = false;
  found:any;

  constructor(
    public _modalUploadService: ModalUploadService,
    public _usuarioService: UsuarioService,
    public _grupoService: GrupoService,
    public router: Router,
  ) {
    this.cargarGrupos();
  }

  ngOnInit() {
  }
  
  buscarCarrera( value: string ){

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

    var resultado: number;

    if ( termino.length <= 0 ) {
      this.cargarGrupos();
      return;
    }

    this.cargando = true;
    if( this.vBusqueda === 'Año' ){
      console.log("La variable busqueda es AÑO y el termino se cambio a Entero")
      var terminoNumber:number = parseInt(termino);
    }
    for (let i = 0; i < this.grupos.length; i++) {
      if( this.grupos[i].year === terminoNumber ){
        resultado = i;
        this.grupos = this.grupos[resultado];
        return
      }
    }
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
