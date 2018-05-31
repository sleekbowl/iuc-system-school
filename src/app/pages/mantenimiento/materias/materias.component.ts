import { Component, OnInit } from '@angular/core';
import { GrupoService } from '../../../services/grupo/grupo.service';
import { MatriculaService } from '../../../services/matricula/matricula.service';
import { UsuarioService } from '../../../services/service.index';

import swal from 'sweetalert';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent implements OnInit {

  busqueda: boolean = false;
  busquedaSS: boolean = false;
  cateBus: boolean = true;
  //Variable de tabla con materias ingresadas
  guardado: boolean = false;
  //Variables de botones
  inputGrupo: boolean = false;
  inputMaestro: boolean = false;
  
  grupos: Array<any> = new Array();
  //Variables de los inputs
  grupoSelec: string = '';
  maestroSelec:  string = '';
  materiaSelec: string = '';
  //Variables con el id de los inputs
  idGrupo: string = '';
  idMaestro: string = '';
  idMateria: string = '';
  //Variable de tabla de materias ya ingresadas
  materia: Array<{grupo:string, materia:string, maestro:string}> = new Array;

  buscarcatedratico: boolean = false;
  catedraticos: Array<any> = new  Array();


  constructor(
    public _grupoServices: GrupoService,
    public _catedraticoService: UsuarioService
  ) {
    console.log(this.materia);
  }

  ngOnInit() {
  }

  buscarGrupo(grupo: string){
    this.busquedaSS = false;
    this.busqueda = true;
    if (grupo.length === 0 ){
      this.busqueda = true;
      return;
    }
    this._grupoServices.buscarGrupos(grupo).subscribe( (data: any) =>  {    
      this.grupos = data.grupos;
    });
  }

  buscarCatedratico (catedratico: string) {
    this.buscarcatedratico = true;
    if(catedratico.length === 0) {
        this.buscarcatedratico = false;
        return;
    }
    this._catedraticoService.buscarUsuarios(catedratico).subscribe( (data: any) => {
      this.catedraticos = data;
    });
  }

  seleccionarGrupo( id: string ){
    this.busqueda = false;
    this.grupoSelec = this.grupos[id].nombre;
    this.busquedaSS = true;
    this.inputGrupo = true;
  }

  selecionarCatedratico(id: string){
    // this.materia.materias.push({ nombre: this.nombreMateria, catedratico: this.maestroSelec });
    this.idMaestro = this.catedraticos[id]._id;
    this.maestroSelec = this.catedraticos[id].nombre;
    this.cateBus = false;
    this.inputMaestro = true;
  }

  pregurdado(){
    if( this.inputGrupo === false ){
      swal({
        title: "!Seleccione un grupo¡",
        icon: "error",        
      });
      return;      
    }
    if( this.materiaSelec.length === 0 ){
      swal({
        title: "!Ingrese una materia¡",
        icon: "error",
      });
      return;
    }
    if( this.inputMaestro === false ){
      swal({
        title: "¡Seleccione un maestro",
        icon: "error",        
      });
      return;      
    }
    this.guardado = true;
    this.materia.push({grupo: this.grupoSelec, materia:this.materiaSelec, maestro: this.maestroSelec})
    console.log(this.materia);
  }

  borrarMateria( identi:number ){
    this.materia.splice(identi, 1);
    console.log(this.materia);
    if(this.materia.length === 0){
      this.guardado = false;
    }
  }
  borrarGrupo(){
    if( this.materia.length === 0 ){
      this.grupoSelec = "";
      this.inputGrupo = false;
    }else{
      // swal("Si borra el grupo perdera todo lo que ha ingresado", {
      //   buttons: {
      //     cancel: "Cancelar",
      //     catch: {
      //       text: "Borrar",
      //       value: "catch",
      //     },
      //   },
      // })
      // .then((value) => {
      //   switch (value) {
      
      //     case "catch":
      //       this.materia = [];
      //       this.guardado = false;
      //       this.grupoSelec = "";
      //       this.maestroSelec = "";
      //       this.materiaSelec = "";
      //       this.busquedaSS = false;
      //       this.cateBus = true;
      //       this.inputGrupo = false;
      //       this.inputMaestro = false;
      //       this.buscarcatedratico = false;
      //       break;
       
      //     default:
      //       break;
      //   }
      // });
    }
  }
  borrarMaestro(){
    this.maestroSelec = "";
    this.inputMaestro = false;
    this.cateBus = true;
    this.buscarcatedratico = false;
  }
}
