import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';

import { URL_SERVICIOS } from '../../config/config';

import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from '../../models/medico.model';
import { Paciente } from '../../models/paciente.model';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(public http: HttpClient, public _usuarioService: UsuarioService, public _subirImagenService: SubirArchivoService ) { }

  cargarPaciente(desde:number = 0){

    let url = `${URL_SERVICIOS}/paciente/?desde=${desde}`;

    return this.http.get(url);

   }

   buscarPaciente(termino: string){
    
    let url = `${URL_SERVICIOS}/busqueda/coleccion/paciente/${termino}`;

    return this.http.get(url)
              .pipe(map((resp: any) => resp.paciente)); 

   }

   obtenerPaciente( id: string ){

    let url = `${URL_SERVICIOS}/paciente/${id}`;

    return this.http.get(url); 
   }

   borrarPaciente(	id:	string	){

    let url = `${URL_SERVICIOS}/paciente/${id}`;
    url += '?token='+ this._usuarioService.token;

    return this.http.delete(url);

   }

   guardarPaciente(paciente: Paciente){

    if(paciente._id){// actualizar

      let url = `${URL_SERVICIOS}/paciente/${paciente._id}`;
      url += '?token='+ localStorage.getItem('token');
  
      return this.http.put(url, paciente).pipe(map((response: any) => {
  
        swal("Operación Exitosa", "Paciente actualizado", "success");
        return response.paciente;
        
      }));

    }else{
      paciente.img = null;
      let url = `${URL_SERVICIOS}/paciente`;
      url += '?token='+ localStorage.getItem('token');
  
      return this.http.post(url, paciente).pipe(map((response: any) => {
  
        swal("Operación Exitosa", "Paciente creado", "success");
        return response.paciente;
        
      }));
    }

   }

   cambiarImagen(archivo: File, id: string){  
    //console.log('cambiarImagen profileCompone');
    this._subirImagenService.subirArchivo(archivo,'pacientes',id)
    .then((resp: any) => {
      swal('Imagen Actualizada', resp.paciente.nombres, 'success' );

    })
    .catch( resp => {

      console.log(resp);

    });
  }
}
