import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

import { ProfileComponent } from './profile/profile.component';

// Guards
import { LoginGuardGuard } from '../services/service.index';
import { AdminGuard } from '../services/service.index';

import { UsuariosComponent } from './usuarios/usuarios.component';
// import { HospitalesComponent } from './hospitales/hospitales.component';
// import { MedicosComponent } from './medicos/medicos.component';
// import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { VerificaTokenGuard } from '../services/guards/verifica-token.guard';
import { MatriculasComponent } from './matriculas/matriculas.component';
import { MatriculaComponent } from './matriculas/matricula.component';
import { CarrerasComponent } from './mantenimiento/carreras/carreras.component';
import { GruposComponent } from './mantenimiento/grupos/grupos.component';
import { CalificacionesComponent } from './mantenimiento/calificaciones/calificaciones.component';


const pagesRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [ VerificaTokenGuard ],
        data: { titulo: 'Dashboard' }
    },
    { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBars' } },
    { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Gráficas' } },
    { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
    { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },
    { path: 'account-settings', component: AccoutSettingsComponent, data: { titulo: 'Ajustes de Tema' } },
    { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario' } },
    { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador' } },
    // Mantenimientos
    {
        path: 'usuarios',
        component: UsuariosComponent,
        canActivate: [ AdminGuard ],
        data: { titulo: 'Mantenimiento de Usuarios' }
    },
    { path: 'matriculas', component: MatriculasComponent, canActivate:[ AdminGuard ],  data: { titulo: 'Mantenimiento de Matriculas' } },    
    { path: 'matricula/:id', component: MatriculaComponent, canActivate:[ AdminGuard ], data: { titulo: 'Actualizar Matricula' } },
    { path: 'carreras', component: CarrerasComponent, canActivate:[ AdminGuard ], data: { titulo: 'Mantenimiento de Carreras' } },
    { path: 'grupos', component: GruposComponent, canActivate:[ AdminGuard ], data: { titulo: 'Mantenimiento de Grupos' } },
    { path: 'calificaciones', component: CalificacionesComponent, canActivate:[ AdminGuard ], data: { titulo: 'Mantenimiento de Calificaciones' } },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
    // { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de Hospitales' } },
    // { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de Médicos' } },
    // { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Actualizar Médico' } },
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
