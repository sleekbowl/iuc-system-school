import { Component, OnInit } from '@angular/core';
import { PieGridComponent } from '@swimlane/ngx-charts';
import { MatriculaService } from '../../services/matricula/matricula.service';
import { MatriculasComponent } from '../matriculas/matriculas.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  single = [
    {
      "name": "Alumnos",
      "value": 953000
    },
    {
      "name": "Maestros",
      "value": 236000

    },
    {
      "name": "Administrativos",
      "value": 987563
    },
    {
      "name": "Ayudantes",
      "value": 987563
    }
  ];
  multi: any[];

  // view: any[] = [1200, 600];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  colorScheme = {
    domain: ['#398bf7', '#06d79c', '#745af2', '#ef5350']
  };

  // line, area
  autoScale = true;

  desde: number = 0;
  totalRegistros: number = 0;
  nothing:boolean = true;

  intAlumno: number = 0;
  intMaestro: number = 0;
  intAdmin: number = 0;

  constructor(
    public _matriculaService: MatriculaService
  ) {
    this.cargarEscuela();
  }

  ngOnInit() {
    
  }

  onSelect(event) {
    console.log(event);
  }

  cargarEscuela() {
    this._matriculaService.cargarMatriculas().subscribe(data => {
      for (let index = 0; index < data.length; index++) {
        if ( data[index].tipo === 'Administrativo') {
          this.intAdmin++;
        }
        if ( data[index].tipo === 'Maestro') {
          this.intMaestro++;
        }
        if ( data[index].tipo === 'Alumno') {
          this.intAlumno++;
        }
      }
      console.log(this.intAdmin);
      console.log(this.intAlumno);
      console.log(this.intMaestro);
    });
  }

}
