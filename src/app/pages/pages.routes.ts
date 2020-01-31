import { RouterModule,Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
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
    { path : 'graficas1',  component : Graficas1Component, data: { titulo: 'Gráficas' } },
    { path : 'promesas',  component : PromesasComponent, data: { titulo: 'Promesas' } },
    { path : 'rxjs',  component : RxjsComponent, data: { titulo: 'Rxjs' } },
    { path : 'profile',  component : ProfileComponent, data: { titulo: 'Perfil' } },
    { path : 'busqueda/:termino',  component : BusquedaComponent, data: { titulo: 'Buscador' } },
    { path : 'account-settings',  component : AccoutSettingsComponent, data: { titulo: 'Ajustes de Temas' } },
    //Mantenimiento::::::::::::::::::::::
    { 
        path : 'usuarios',  
        canActivate: [ AdminGuard ],
        component : UsuariosComponent, 
        data: { titulo: 'Mantenimiento de Usuarios' } 
    },
    { path : 'hospitales',  component : HospitalesComponent, data: { titulo: 'Mantenimiento de Hospitales' } },
    { path : 'medicos',  component : MedicosComponent, data: { titulo: 'Mantenimiento de Médicos' } },
    { path : 'medico/:id',  component : MedicoComponent, data: { titulo: 'Actualizar Médico' } },
    { path : 'pacientes',  component : PacientesComponent, data: { titulo: 'Mantenimiento de Pacientes' } },
    { path : 'paciente/:id',  component : PacienteComponent, data: { titulo: 'Actualizar Paciente' } },
    { path : '',  redirectTo : '/dashboard', pathMatch: 'full' }

];
export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);