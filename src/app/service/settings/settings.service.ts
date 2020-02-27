import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
declare function setZoon(valor);

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default-dark.css',
    tema:'default'
  }

  zoon: string ='80';

  constructor(@Inject(DOCUMENT) private _document) {
    this.cargarAjustes();
   }
  guardarAjustes(){
    //console.log('Guardar ajustes');
    localStorage.setItem('ajustes',JSON.stringify(this.ajustes));
  }
  guardarZoon(){
 
 
    localStorage.setItem('zoon',this.zoon);
  }
  cargarAjustes(){

    if(localStorage.getItem('zoon')){
      this.zoon = localStorage.getItem('zoon');
  
    }
    this.aplicarZoon(this.zoon);
    if(localStorage.getItem('ajustes')){

      this.ajustes = JSON.parse(localStorage.getItem('ajustes')) ;
      //console.log('Cargando valores del locar store');
      this.aplicarTema(this.ajustes.tema);
    }else{
      //console.log('Cargando valores por default');
    }
  }

  aplicarZoon(zoon: string){
    //window.document.body.style.zoom= zoon + '%';
    setZoon(zoon);
    this.zoon = zoon;
    this.guardarZoon();
    
  }

  aplicarTema(tema: string){
    let url = `assets/css/colors/${tema}.css`;
    this._document.getElementById('theme').setAttribute('href', url);
    this.ajustes = {temaUrl: url, tema};
    this.guardarAjustes();
    
  }
}

interface Ajustes {

  temaUrl: string;
  tema: string;

}