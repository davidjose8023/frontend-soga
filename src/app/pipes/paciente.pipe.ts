import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paciente'
})
export class PacientePipe implements PipeTransform {

  transform(value:string, tipo: string): any {
    
   let resp ='n/a';

    switch (tipo) {
      case 'sexo':
        
        if(value == 'm'){

          resp= 'Masculino';

        }
        if(value == 'f'){

          resp= 'Femenino';

        }
        break;
      case 'ec':
        
        if(value == 'c'){

          resp= 'Casado(a)';

        }
        if(value == 's'){

          resp= 'Soltero(a)';

        }
        if(value == 'v'){

          resp= 'Viudo(a)';

        }
        break;
  
    }


    return resp;
  }

}
