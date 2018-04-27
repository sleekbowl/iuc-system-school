import { Component, OnInit } from '@angular/core';

//Modelos
import { Carrea } from '../../../models/carrera.model';
import { CarreraService } from '../../../services/service.index';

@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styles: []
})
export class CarrerasComponent implements OnInit {

  cargando: boolean = true;
  carrera: Carrea;
  carreraSer

  constructor( public _carreraService: CarreraService ) {
    
  }

  ngOnInit() {
    this._carreraService.cargarCarreras();
  }

  agregarCarrera( tipo ){
    if( tipo === "nuevo" ){
      this.carrera.nombre = "";
      this.carrera.revoe = "";
      this.carrera.year = "";
    }else{

    }
  }

}
