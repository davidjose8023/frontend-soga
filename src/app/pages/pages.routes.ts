import { RouterModule,Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { AgendaComponent } from './agenda/agenda.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardsGuard, AdminGuard } from '../service/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { VerificaTokenGuard } from '../service/guards/verifica-token.guard';
import { PacientesComponent } from './pacientes/pacientes.component';
import { PacienteComponent } from './pacientes/paciente.component';


const pagesRoutes: Routes = [

    { 
        path : 'dashboard',  
        canActivate: [VerificaTokenGuard],
        component : DashboardComponent, 
        data: { titulo: 'Dashboard' } 
    },
    { path : 'progress', canActivate: [VerificaTokenGuard],  component : ProgressComponent, data: { titulo: 'Progress' }  },
    { path : 'graficas1', canActivate: [VerificaTokenGuard],  component : Graficas1Component, data: { titulo: 'Gráficas' } },
    { path : 'promesas',canActivate: [VerificaTokenGuard],  component : PromesasComponent, data: { titulo: 'Promesas' } },
    { path : 'rxjs', canActivate: [VerificaTokenGuard], component : RxjsComponent, data: { titulo: 'Rxjs' } },
    { path : 'profile',canActivate: [VerificaTokenGuard],  component : ProfileComponent, data: { titulo: 'Perfil' } },
    { path : 'busqueda/:termino', canActivate: [VerificaTokenGuard],  component : BusquedaComponent, data: { titulo: 'Buscador' } },
    { path : 'account-settings', canActivate: [VerificaTokenGuard],  component : AccoutSettingsComponent, data: { titulo: 'Ajustes de Temas' } },
    { path : 'agenda', canActivate: [VerificaTokenGuard],  component : AgendaComponent, data: { titulo: 'Agenda Médica' } },
    //Mantenimiento::::::::::::::::::::::
    { 
        path : 'usuarios',  
        canActivate: [ AdminGuard ],
        component : UsuariosComponent, 
        data: { titulo: 'Mantenimiento de Usuarios' } 
    },
    { path : 'hospitales', canActivate: [VerificaTokenGuard], component : HospitalesComponent, data: { titulo: 'Mantenimiento de Hospitales' } },
    { path : 'medicos', canActivate: [VerificaTokenGuard],  component : MedicosComponent, data: { titulo: 'Mantenimiento de Médicos' } },
    { path : 'medico/:id',canActivate: [VerificaTokenGuard],   component : MedicoComponent, data: { titulo: 'Actualizar Médico' } },
    { path : 'pacientes',canActivate: [VerificaTokenGuard], component : PacientesComponent, data: { titulo: 'Mantenimiento de Pacientes' } },
    { path : 'paciente/:id',canActivate: [VerificaTokenGuard],  component : PacienteComponent, data: { titulo: 'Actualizar Paciente' } },
    { path : '',  redirectTo : '/dashboard', pathMatch: 'full' }

];
export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);