import { RouterModule, Routes } from '@angular/router';

// Guards
import { LoginGuardGuard, StudentGuard } from '../../services/service.index';
import { AdminGuard } from '../../services/service.index';
import { DashboardComponent } from './paginas/dashboard/dashboard.component';


const pagesRoutes: Routes = [
    { path: 'dashboardS', component: DashboardComponent, canActivate:[ StudentGuard ], data: { titulo: 'ProgressBars' } }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );