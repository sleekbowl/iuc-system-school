import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { Grupo } from '../../../models/grupo.model';
import { GrupoService, UsuarioService, CarreraService } from '../../../services/service.index';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginComponent } from '../../../login/login.component';

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
  vinc = new Array();
  searchAlum : boolean = false;
  search : boolean = true;
  totalAlumnos: number = 0;

  constructor(
    public _grupoService: GrupoService,
    public _usuarioService: UsuarioService,
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
            this.totalAlumnos = grupo.alumnos.length;
            console.log(this.grupo);
            if( this.grupo.alumnos.length === 0){
              this.empy = true;
            }else{
              this.empy = false;
            }
            this.cargarAlumnos();
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

  vinculador( value ){
    console.log(value);
    if ( value.length <= 0 ) {
      this.searchAlum = false;
      return;
    }
    this._grupoService.buscarUsuario( value ).subscribe( data => {
      this.vinc = data;
      this.searchAlum = true;
    });
  }

  vincularAlumno( alumno:string ){
    this._grupoService.vincularAlumno( alumno, this.grupo._id ).subscribe( data =>{
      this.cargarGrupo( this.id );      
    });
  }

  cargarAlumnos( ){
    let help = new Array();
    for (let index = 0; index < this.grupo.alumnos.length; index++) {
      this._usuarioService.cargarUsuario( this.grupo.alumnos[index] ).subscribe( alumnos => {
        help.push(alumnos);
        this.grupo.alumnos = help;
      });
    }
    this.search = false;
  }
}
