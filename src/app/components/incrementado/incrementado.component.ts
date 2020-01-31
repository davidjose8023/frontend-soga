import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-incrementado',
  templateUrl: './incrementado.component.html',
  styleUrls: ['./incrementado.component.css']
})
export class IncrementadoComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress : ElementRef;

  @Input('nombre') leyenda: string = "Leyenda";
  @Input() progress: number = 50;

  @Output() cambioValor: EventEmitter <number> =  new EventEmitter();
  

  constructor() {
    //console.log('leyenda', this.leyenda);
    //console.log('progress', this.progress);  
     
  }

  ngOnInit() {
    //console.log('leyenda', this.leyenda);
    //console.log('progress', this.progress);
  }

  cambiarValor(valor: number){
    if(this.progress >= 0 && this.progress <= 100){
      var result = this.progress + valor;
      if(result >= 0 && result <= 100){
        this.progress = result;
      }
    }else if(this.progress < 0){
      this.progress = 0;

    }else if(this.progress > 100){
      this.progress = 100;

    }
    this.cambioValor.emit( this.progress );
  }

  onChange(event: number){
    
    //let elementoHtml: any = document.getElementsByName('progress')[0];

    this.progress = event;
    if(event > 100){
      this.progress = 100;
       
    }
    if(event < 0){
      this.progress = 0;
      
    }
    this.txtProgress.nativeElement.value = this.progress;

    this.cambioValor.emit(this.progress);

    this.txtProgress.nativeElement.focus();
  }

}
