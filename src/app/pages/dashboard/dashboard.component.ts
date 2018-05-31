import { Component, OnInit } from '@angular/core';
import { PieGridComponent } from '@swimlane/ngx-charts';
import { MatriculaService } from '../../services/matricula/matricula.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit{
  
  desde: number = 0;
  totalRegistros: number = 0;
  nothing:boolean = true;

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

  constructor(
    public _matriculasService: MatriculaService
  ) {
  }

  ngOnInit() {
    
  }

  onSelect(event) {
    console.log(event);
  }

  alumnos( ) {

    this._matriculasService.buscarMatricula( this.desde )
              .subscribe( (resp: any) => {
                this.totalRegistros = resp.total;
                if( this.totalRegistros === 0 ){
                  this.nothing = true;
                }else{
                  this.nothing = false;
                }
              });

  }

  profesores(){

  }

  administrativos(){

  }

}
