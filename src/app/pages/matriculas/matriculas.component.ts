import { Component, OnInit } from '@angular/core';
import { Matricula } from '../../models/matricula.model';
import { MatriculaService } from '../../services/service.index';

@Component({
  selector: 'app-matriculas',
  templateUrl: './matriculas.component.html',
  styles: []
})
export class MatriculasComponent implements OnInit {

  matriculas: Matricula[] = [];

  constructor(
    public _matriculaService: MatriculaService
  ) { }

  ngOnInit() {
    this.cargarMatriculas();
  }

  cargarMatriculas() {
    this._matriculaService.cargarMatriculas()
          .subscribe( matriculas => this.matriculas = matriculas );
  }
  
  buscarMatriculas( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarMatriculas();
      return;
    }

    this._matriculaService.buscarMatriculas( termino )
            .subscribe( matriculas =>  this.matriculas = matriculas );
  }

  borrarMatricula( matricula: Matricula ) {

    this._matriculaService.borrarMatricula( matricula._id )
            .subscribe( () =>  this.cargarMatriculas() );

  }
}
