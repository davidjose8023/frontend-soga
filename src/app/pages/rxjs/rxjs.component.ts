import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';



@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subcription: Subscription;

  constructor() { 

    

    this.subcription = this.regresaObservable().
    subscribe( 
      numero => console.log('Subs',numero),
      error => console.error('Error', error),
      () => console.log('El observador Termino')
    
    );

  }

  ngOnInit() {
  }

  ngOnDestroy(){

    console.log('La pagina se va a cerrar');
    this.subcription.unsubscribe();
  }

  regresaObservable(): Observable <any>{
    return new Observable( (observer: Subscriber< any >) => {
      
      let cont = 0;

      let intervalo = setInterval(()=>{
        
        cont += 1;
        const salida = {
          valor: cont
        };
        observer.next(salida);
        // if(cont === 3){

        //   clearInterval(intervalo);

        //   observer.complete();

        // }

        // if(cont === 2){

  

        //   observer.error('Auxilio');

        // }

      }, 1000);

    }).pipe( map(resp => { return resp.valor}),
             filter(( valor, index)=>{
               //console.log('Filter', valor, index);

               if( ( valor % 2) === 1){
                return true;// Es par
               }else{

                return false;// Es impar

               }
               
             }));

  }

}
