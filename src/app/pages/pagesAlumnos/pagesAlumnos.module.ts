import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// ng2-charts
import { ChartsModule } from 'ng2-charts';

// Pipe Module
import { PipesModule } from '../../pipes/pipes.module';

//Perfec Scrollball

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

//Paginas
import { DashboardComponent } from './paginas/dashboard/dashboard.component';
import { PAGES_ROUTES } from './pagesAlumno.routs';
import { CalificacionesComponent } from './portafolio/calificaciones/calificaciones.component';
import { EventosComponent } from './portafolio/eventos/eventos.component';
import { ExamenesComponent } from './portafolio/examenes/examenes.component';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
  };

//Paginas para estudiantes

@NgModule({
    declarations: [
        // Componentes,
        
    DashboardComponent,
        CalificacionesComponent,
        EventosComponent,
        ExamenesComponent],
    exports: [
        
    ],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ChartsModule,
        PipesModule,
        PerfectScrollbarModule,
        PAGES_ROUTES
    ],
    providers: [
        {
          provide: PERFECT_SCROLLBAR_CONFIG,
          useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
      ]
})
export class PagesAlumnosModule { }
