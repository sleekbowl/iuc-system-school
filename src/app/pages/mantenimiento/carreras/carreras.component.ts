import { Component, OnInit } from '@angular/core';

//Modelos
import { Carrera } from '../../../models/carrera.model';
import { CarreraService } from '../../../services/service.index';

let $:any;

@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styles: []
})
export class CarrerasComponent implements OnInit {

  cargando: boolean = true;
  nothing: boolean = true;
  carrera: Carrera = new Carrera("", "", 0, "");
  carreras: any;
  creator: boolean = false;

  constructor( public _carreraService: CarreraService ) {
    
  }

  ngOnInit() {
    this.cargarCarreras();
  }

  agregarCarrera(){
    this.creator = true;
    this.carrera.nombre = "";
    this.carrera.revoe = "";
    this.carrera.year = 0;
  }
  guardarCarrera( carrera:Carrera ){
    console.log( this.carrera );
    this._carreraService.crearCarrera(this.carrera).subscribe( () => {
      this.cargarCarreras();
    });  

  }

  actualizarCarrera( index:number ){
    this.creator = false;
    console.log( index );
    this.carrera.nombre = this.carreras[index].nombre;
    this.carrera.revoe = this.carreras[index].revoe;
    this.carrera.year = this.carreras[index].year;
    this.carrera._id = this.carreras[index]._id;
  }
  guardarActualizacion( carrera:Carrera ){
    this._carreraService.actualizarCarrera( this.carrera ).subscribe(()=>{
      this.cargarCarreras();
    })
  }

  cargarCarreras(){
    this._carreraService.cargarCarreras().subscribe( datos =>{
      console.log( datos );
      this.carreras = datos;
      this.cargando = false;
      if( this._carreraService.totalCarreras === 0 ){
        this.nothing = true;
      }else{
        this.nothing = false;
      }
    })
  }

}
