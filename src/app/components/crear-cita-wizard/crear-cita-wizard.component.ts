import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';

 

declare function wizard();
declare function next();
declare function previous();
declare function finish();

const totalSteps = 3;

@Component({
  selector: 'app-crear-cita-wizard',
  templateUrl: './crear-cita-wizard.component.html',
  styleUrls: ['./crear-cita-wizard.component.css']
})
export class CrearCitaWizardComponent implements OnInit {
  numSteps: number = 1;
  disabledNext: boolean;
  disabledPrevious: boolean;
  buttonGuardar: boolean = false;
  @Input() validacion: boolean= false;
  @Output() infoWizard: any = new EventEmitter();
  

  constructor() { 

    this.disabledPrevious = true;
    this.disabledNext = false;
  
  }

  ngOnInit() {

    wizard();
      
    
  }

  siguiente(){
    if(!this.validacion){

 
      this.infoWizard.emit({buttonGuardar:false, seccion: this.numSteps,disabledNext:false,
        disabledPrevious:this.disabledPrevious });
      return;
    }


    if(this.numSteps < totalSteps){
      this.disabledPrevious = false;
      if(this.numSteps == (totalSteps - 1)){
        
        this.buttonGuardar = true;


        this.disabledNext = true;
    
      }
      next();
      this.numSteps ++;

    }else {
      this.buttonGuardar = true;

      this.disabledNext = true;
    }

    this.infoWizard.emit({buttonGuardar:this.buttonGuardar, seccion: this.numSteps,disabledNext:this.disabledNext,
      disabledPrevious:this.disabledPrevious });
    
  }
  anterior(){

   if(this.numSteps > 1){
    this.disabledNext = false;
    if(this.buttonGuardar){

      this.buttonGuardar = false;
 
      
    }



    previous();
    this.numSteps --;
    console.log('previous', this.numSteps);
   }else{
    this.disabledPrevious = true;
   }
   this.infoWizard.emit({buttonGuardar:this.buttonGuardar, seccion: this.numSteps,disabledNext:this.disabledNext,
    disabledPrevious:this.disabledPrevious });
    
  }
  

  final(){
   
    finish();
  }
}
