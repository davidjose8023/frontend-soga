import { Pipe, PipeTransform } from '@angular/core';
import  { URL_SERVICIOS }  from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img:string, tipo: string = 'usuarios'): any {
    
    let url = `${URL_SERVICIOS}/img`;

    if( !img )
    return `${url}/usuarios/xxx`;
    
    if( img.indexOf('https') >= 0 )
    return img;
    

    switch (tipo) {
      case 'usuarios':
        
        url = `${url}/usuarios/${img}`;
        break;
      case 'medicos':
        
        url =  `${url}/medicos/${img}`;
        break;

      case 'hospitales':
      
        url = `${url}/hospitales/${img}`;
      break;
      
      case 'pacientes':
      
        url = `${url}/pacientes/${img}`;
      break;
    
      default:
        console.log('tipo de imagen no existe, usuarios, medicos, hospitales');
        url = `${url}/usuarios/xxx`;
        break;
    }


    return url;
  }

}
