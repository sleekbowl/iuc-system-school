import { RouterModule, Routes } from '@angular/router';

// Guards
import { LoginGuardGuard, StudentGuard } from '../../services/service.index';
import { AdminGuard } from '../../services/service.index';
import { DashboardComponent } from './paginas/dashboard/dashboard.component';
import { CalificacionesComponent } from './portafolio/calificaciones/calificaciones.component';
import { EventosComponent } from './portafolio/eventos/eventos.component';
import { ExamenesComponent } from './portafolio/examenes/examenes.component';


const pagesRoutes: Routes = [
    { path: 'dashboardS', component: DashboardComponent, canActivate:[ StudentGuard ], data: { titulo: 'Principal' } },
    { path: 'calificaciones', component: CalificacionesComponent, canActivate:[ StudentGuard ], data: { titulo: 'Calificaciones' } },
    { path: 'eventosS', component: EventosComponent, canActivate:[ StudentGuard ], data: { titulo: 'Calificaciones' } },
    { path: 'examenesS', component: ExamenesComponent, canActivate:[ StudentGuard ], data: { titulo: 'Calificaciones' } }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );