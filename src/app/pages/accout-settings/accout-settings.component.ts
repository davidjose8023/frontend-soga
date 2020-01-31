import { Component, OnInit, Inject } from '@angular/core';
import { SettingsService } from '../../service/settings/settings.service';


@Component({
  selector: 'app-accout-settings',
  templateUrl: './accout-settings.component.html',
  styles: []
})
export class AccoutSettingsComponent implements OnInit {

  constructor( public _settingsService: SettingsService) { 

  }

  ngOnInit() {

    this.reasignarCheck();
  }

  cambiarColor(tema: string, link: any){
    //console.log(link);
    this.aplicarCheck(link);
    this._settingsService.aplicarTema(tema);


  }

  aplicarCheck(link: any){
    let selectores: any = document.getElementsByClassName('selector');

    console.log(selectores);

    for(let ref of selectores){

      ref.classList.remove('working');
    }

    link.classList.add('working');
  }

  reasignarCheck(){

    let selectores: any = document.getElementsByClassName('selector');
    let tema = this._settingsService.ajustes.tema;
    for(let ref of selectores){

      ref.classList.remove('working');
      
    }
    for(let ref of selectores){

      if(ref.getAttribute('data-theme') == tema){
        ref.classList.add('working');
        break;
      }
      
    }
 
  }



}
