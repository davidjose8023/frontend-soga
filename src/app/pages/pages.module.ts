import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// modulos
import { SharedModule } from '../shared/shared.module';
import { PipesModule } from '../pipes/pipes.module';
import { CommonModule } from '@angular/common';
//ng2-charts
import { ChartsModule } from 'node_modules/ng2-charts';

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
      ],
      exports:[
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadoComponent,
        GraficoDonaComponent,
      ],
      imports:[
          CommonModule,
          SharedModule,
          PAGES_ROUTES,
          FormsModule,
          ChartsModule,
          PipesModule
      ]
})
export class PagesModule {}