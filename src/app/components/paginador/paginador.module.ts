import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginadorComponent } from './paginador.component';

@NgModule({
  declarations: [
    PaginadorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [    
    PaginadorComponent    
]
})
export class PaginadorModule { }
