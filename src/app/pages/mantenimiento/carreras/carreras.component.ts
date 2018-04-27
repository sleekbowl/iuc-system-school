import { Component, OnInit } from '@angular/core';

//Modelos
import { Carrea } from '../../../models/carrera.model';

@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styles: []
})
export class CarrerasComponent implements OnInit {

  cargando: boolean = true;
  carrera: Carrea;

  constructor() { }

  ngOnInit() {
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
