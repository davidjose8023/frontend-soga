import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// modulos
import { PaginadorModule } from '../components/paginador/paginador.module';
import { CrearCitaWizardModule } from '../components/crear-cita-wizard/crear-cita-wizard.module';
import { SharedModule } from '../shared/shared.module';
import { PipesModule } from '../pipes/pipes.module';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';

//ng2-charts
import { ChartsModule } from 'node_modules/ng2-charts';

import {DatePipe} from '@angular/common';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PAGES_ROUTES } from './pages.routes';
import { IncrementadoComponent } from '../components/incrementado/incrementado.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { PacienteComponent } from './pacientes/paciente.component';
import { AgendaComponent } from './agenda/agenda.component';




@NgModule({
    declarations: [
        //PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadoComponent,
        GraficoDonaComponent,
        AccoutSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        ProfileComponent,
        UsuariosComponent,
        //ModalUploadComponent,
        HospitalesComponent,
        MedicosComponent,
        MedicoComponent,
        BusquedaComponent,
        PacientesComponent,
        PacienteComponent,
        AgendaComponent
      ],
      exports:[
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadoComponent,
        GraficoDonaComponent
      ],
      imports:[
          CommonModule,
          SharedModule,
          PAGES_ROUTES,
          FormsModule,
          ReactiveFormsModule,
          ChartsModule,
          PipesModule,
          PaginadorModule,
          CrearCitaWizardModule,
          NgSelectModule

      ],
      providers: [
        DatePipe
      ],
})
export class PagesModule {}