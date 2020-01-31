import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() { 
  
    

    this.contarTres().then(
      ()=> console.log('Termnado')
      ).catch( error => console.error('Erros en Promesa', error));
  }

  ngOnInit() {
  }

  contarTres(): Promise<boolean>{

    return new Promise((resolve, reject)=>{

      let contador =0;

      let interval = setInterval(()=>{
        contador +=1;
        console.log(contador);

        if(contador === 3){
          
          resolve(true);
          //reject('Error N°'+contador);
          clearInterval(interval);

        }
        
      }, 1000);

    });
    
  }

}
