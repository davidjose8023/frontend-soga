import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';
import { PacientePipe } from './paciente.pipe';


@NgModule({
  declarations: [
    ImagenPipe,
    PacientePipe
  ],
  imports: [
    
  ],
  exports:[
    ImagenPipe,
    PacientePipe
  ]
})
export class PipesModule { }
