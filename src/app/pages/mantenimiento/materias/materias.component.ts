import { Component, OnInit } from '@angular/core';
import { GrupoService } from '../../../services/grupo/grupo.service';
import { MatriculaService } from '../../../services/matricula/matricula.service';
import { UsuarioService } from '../../../services/service.index';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent implements OnInit {

  busqueda: boolean = false;
  busquedaSS: boolean = false;
  cateBus: boolean = true;

  grupos: Array<any> = new Array();
  grupoSelec: string = '';
  maestroSelec:  string = '';
  idMaestro: string = '';
  materiaSelec: string = '';
  materia: any = {
    grupo: '',
    materias: [
      {nombre: '',
      catedratico: ''}
    ],

  };

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
    this.materia.grupo = this.grupos[id]._id;
    this.busqueda = false;
    this.grupoSelec = this.grupos[id].nombre;
    this.busquedaSS = true;
  }

  selecionarCatedratico(id: string){
    // this.materia.materias.push({ nombre: this.nombreMateria, catedratico: this.maestroSelec });
    this.idMaestro = this.catedraticos[id]._id;
    
    this.maestroSelec = this.catedraticos[id].nombre;
    this.cateBus = false;

  }


}
