import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class PatologiaService {

  constructor(public http: HttpClient ) { }

  enfermedadXCategoria(){
    let url = `${URL_SERVICIOS}/enfermedad`;

    //return this.http.get(url);  
    return this.http.get(url).pipe(map((resp: any) => {
      let enfermedad = resp.enfermedad
      enfermedad.forEach((element, index) => {
        enfermedad[index]['catg']= element.categoria.nombre
        
      });

      return enfermedad;

    }));  
  }
}
