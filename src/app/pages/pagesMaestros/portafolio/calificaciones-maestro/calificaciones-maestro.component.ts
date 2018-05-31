import { Component } from '@angular/core';
import { GrupoService } from '../../../../services/grupo/grupo.service';

@Component({
  selector: 'app-calificaciones-maestro',
  templateUrl: './calificaciones-maestro.component.html',
  styles: []
})
export class CalificacionesMaestroComponent  {

  busqueda: boolean = false;
  busquedaSS: boolean = false;

  grupos: Array<any> = new Array();

  grupoSelec: string = '';

  inputGrupo: boolean = false;

  materia: Array<{grupo:string, materia:string, maestro:string}> = new Array;

  constructor(
    public _grupoServices: GrupoService;
  ) {
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

  seleccionarGrupo( id: string ){
    this.busqueda = false;
    this.grupoSelec = this.grupos[id].nombre;
    this.busquedaSS = true;
    this.inputGrupo = true;
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

  buscarMaterias(){
    


  }
}
