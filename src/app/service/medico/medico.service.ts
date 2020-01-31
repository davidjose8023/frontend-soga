import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';

import { URL_SERVICIOS } from '../../config/config';

import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from '../../models/medico.model';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';


@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(public http: HttpClient, public _usuarioService: UsuarioService, public _subirImagenService: SubirArchivoService ) { }

  cargarMedico(desde:number = 0){

    let url = `${URL_SERVICIOS}/medico/?desde=${desde}`;

    return this.http.get(url);

   }

   buscarMedico(termino: string){
    
    let url = `${URL_SERVICIOS}/busqueda/coleccion/medico/${termino}`;

    return this.http.get(url)
              .pipe(map((resp: any) => resp.medico)); 

   }
   obtenerMedico( id: string ){

    let url = `${URL_SERVICIOS}/medico/${id}`;

    return this.http.get(url); 
   }

   borrarMedico(	id:	string	){

    let url = `${URL_SERVICIOS}/medico/${id}`;
    url += '?token='+ this._usuarioService.token;

    return this.http.delete(url);

   }

   guardarMedico(medico: Medico){

    if(medico._id){// actualizar

      let url = `${URL_SERVICIOS}/medico/${medico._id}`;
      url += '?token='+ localStorage.getItem('token');
  
      return this.http.put(url, medico).pipe(map((response: any) => {
  
        swal("Operación Exitosa", "Médico actualizado", "success");
        return response.medico;
        
      }));

    }else{
      medico.img = null;
      let url = `${URL_SERVICIOS}/medico`;
      url += '?token='+ localStorage.getItem('token');
  
      return this.http.post(url, medico).pipe(map((response: any) => {
  
        swal("Operación Exitosa", "Médico creado", "success");
        return response.medico;
        
      }));
    }

   }

   cambiarImagen(archivo: File, id: string){  
    //console.log('cambiarImagen profileCompone');
    this._subirImagenService.subirArchivo(archivo,'medicos',id)
    .then((resp: any) => {
      swal('Imagen Actualizada', resp.medico.nombre, 'success' );

    })
    .catch( resp => {

      console.log(resp);

    });
  }


}
