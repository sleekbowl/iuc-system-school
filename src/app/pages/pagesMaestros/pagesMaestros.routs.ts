import { RouterModule, Routes } from '@angular/router';

// Guards
import { LoginGuardGuard, TeacherGuard } from '../../services/service.index';
import { AdminGuard } from '../../services/service.index';
import { DashboardComponent } from './paginas/dashboard/dashboard.component';


const pagesRoutes: Routes = [
    { path: 'dashboardT', component: DashboardComponent, canActivate:[ TeacherGuard ], data: { titulo: 'ProgressBars' } }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );