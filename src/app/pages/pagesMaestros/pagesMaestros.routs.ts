import { RouterModule, Routes } from '@angular/router';

// Guards
import { LoginGuardGuard, TeacherGuard } from '../../services/service.index';
import { AdminGuard } from '../../services/service.index';
import { DashboardComponent } from './paginas/dashboard/dashboard.component';
import { CalificacionesMaestroComponent } from './portafolio/calificaciones-maestro/calificaciones-maestro.component';


const pagesRoutes: Routes = [
    { path: 'dashboardT', component: DashboardComponent, canActivate:[ TeacherGuard ], data: { titulo: 'ProgressBars' } },
    // tslint:disable-next-line:max-line-length
    { path: 'calificacionesT', component: CalificacionesMaestroComponent, canActivate: [ TeacherGuard ], data: { titulo: 'Subir Calificaciones' } }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );