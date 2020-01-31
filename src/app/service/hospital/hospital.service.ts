import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import swal from 'sweetalert';

import { URL_SERVICIOS } from '../../config/config';

import { Hospital } from '../../models/hospital.model';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(public http: HttpClient, public _usuarioService: UsuarioService) { }

  cargarHospital(desde:number = 0){

    let url = `${URL_SERVICIOS}/hospital/?desde=${desde}`;

    return this.http.get(url);

   }

   cargarHospitalAll(){

    let url = `${URL_SERVICIOS}/hospital`;

    return this.http.get(url)
      .pipe(map((resp: any) => resp.hospitales));

   }

   buscarHospital(termino: string){
    
    let url = `${URL_SERVICIOS}/busqueda/coleccion/hospital/${termino}`;

    return this.http.get(url)
              .pipe(map((resp: any) => resp.hospital)); 

   }
   obtenerHospital( id: string ){

    let url = `${URL_SERVICIOS}/hospital/${id}`;

    return this.http.get(url);
   }

   borrarHospital(	id:	string	){

    let url = `${URL_SERVICIOS}/hospital/${id}`;
    url += '?token='+ this._usuarioService.token;

    return this.http.delete(url);

   }

   crearHospital(hospital: Hospital){

    let url = `${URL_SERVICIOS}/hospital`;
    url += '?token='+ localStorage.getItem('token');

    return this.http.post(url, hospital).pipe(map((response: any) => {

      //swal("Bien Hecho", "Operación Exitosa", "success");
      return response.hospital;
      
    }));
   }

   actualizarHospital(hospital: Hospital){

    //let url = `${URL_SERVICIOS}/usuario/${usuario._id}`;
    let url = URL_SERVICIOS +'/hospital/'+ hospital._id;
    url += '?token='+ this._usuarioService.token;
    //console.log(url);
    return this.http.put(url, hospital)
          .pipe(map((resp: any) =>{

  
            swal('hospital Actualizado', hospital.nombre, 'success' );
            return true;

          }));
 }
}
