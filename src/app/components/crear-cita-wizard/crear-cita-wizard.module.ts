import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearCitaWizardComponent } from "../crear-cita-wizard/crear-cita-wizard.component";
@NgModule({
  declarations: [
    CrearCitaWizardComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    CrearCitaWizardComponent
  ]
})
export class CrearCitaWizardModule { }
