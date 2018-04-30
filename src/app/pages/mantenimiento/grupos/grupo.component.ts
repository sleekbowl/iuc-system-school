import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { Grupo } from '../../../models/grupo.model';
import { GrupoService, UsuarioService, CarreraService } from '../../../services/service.index';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styles: []
})
export class GrupoComponent implements OnInit {

  grupo: any = new Grupo('', '', 0, '');
  tipos = ['Semestre','Cuatrimestre'];
  carreras: any;
  tipo:boolean = false;
  id = "";
  usuario:any;
  empy:boolean = true;

  constructor(
    public _grupoService: GrupoService,
    public _usuariolaService: UsuarioService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _carreraService: CarreraService
  ) {
    activatedRoute.params.subscribe( params => {

      let id = params['id'];
      this.id = id;
      if ( id !== 'nuevo' ) {
        this.cargarGrupo( id );
      }

    });
    this.cargarCarreras();
  }

  ngOnInit() {
  }

  cargarGrupo( id: string ) {
    this._grupoService.cargarGrupo( id )
          .subscribe( grupo => {
            this.grupo = grupo;
            console.log(this.grupo);
            if( this.grupo.alumnos[0] === null ){
              this.empy = true;
            }else{
              this.empy = false;
            }
            console.log(this.empy);
          });
  }

  guardarGrupo( f: NgForm ) {

    if ( f.invalid ) {
      return;
    }

    this.grupo.year = parseInt( this.grupo.year )
    console.log( this.grupo );
    
    this._grupoService.guardarGrupo( this.grupo )
            .subscribe( id => {

              this.grupo._id = id;

              this.router.navigate(['/grupo', id ]);

            },err =>{
              swal({
                icon: "error",
                title: "La grupo no es valida",
                text: "No cumple con los parametros o ya esta ingresada"
              });
            });

  }

  cargarCarreras(){
    this._carreraService.cargarCarreras().subscribe( data => {
      this.carreras = data;
    })
  }

  cambioCarrera( value:string ){
    this.grupo.carrera =  value
  }

}
