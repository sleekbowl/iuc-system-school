import { Component, OnInit } from '@angular/core';
import { PieGridComponent } from '@swimlane/ngx-charts';
import { POINT_CONVERSION_UNCOMPRESSED } from 'constants';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit{


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

  constructor() {
  }

  ngOnInit() {
    
  }

  onSelect(event) {
    console.log(event);
  }

}
