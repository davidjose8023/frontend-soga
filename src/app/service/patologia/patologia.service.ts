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
    let url = `${URL_SERVICIOS}/enfermedad/categoria`;

    return this.http.get(url);  
  }
}
