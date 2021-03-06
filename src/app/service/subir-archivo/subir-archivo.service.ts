import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  subirArchivo(archivo: File, tipo: string, id: string){
     
    return new Promise((resolve, reject) => {
      
      let formdata = new FormData();
  
      let xhr = new XMLHttpRequest();
  
      formdata.append('image', archivo, archivo.name );
    
      xhr.onreadystatechange = function(){
    
        if(xhr.readyState === 4){
        

          if(xhr.status === 200){
            console.log('subida exitosa');
            resolve(JSON.parse( xhr.response ) );
          }else{
  
            console.log('subida fallida');
  
            reject(xhr.response);
          }
        }
        
  
      };
    
        let url = `${URL_SERVICIOS}/upload/${tipo}/${id}`;

        xhr.open('PUT',url, true);
        xhr.send(formdata);
        
    });


  }
}
