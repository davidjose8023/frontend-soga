import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Cita } from '../../models/cita.model';
import swal from 'sweetalert';
 

import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class CitaMedicaService {

  constructor(public http: HttpClient) { }

  obtenerCitas(){

    let url = `${URL_SERVICIOS}/cita`;

    return this.http.get(url).pipe(map((resp: any) => resp.citas)); 
   }

   guardarCita(cita: Cita){

    if(cita._id){// actualizar
  
      let url = `${URL_SERVICIOS}/medico/${cita._id}`;
      url += '?token='+ localStorage.getItem('token');
  
      return this.http.put(url, cita).pipe(map((response: any) => {
  
        swal("Operación Exitosa", "Médico actualizado", "success");
        return response.medico;
        
      }));
  
    }else{
     
      let url = `${URL_SERVICIOS}/medico`;
      url += '?token='+ localStorage.getItem('token');
  
      return this.http.post(url, cita).pipe(map((response: any) => {
  
        swal("Operación Exitosa", "Médico creado", "success");
        return response.medico;
        
      }));
    }
    
    
  
   }

}


