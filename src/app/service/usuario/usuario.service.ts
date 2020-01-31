import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';

//import 'rxjs/add/operator/catch';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  usuario: Usuario;
  menu: any[] = [];
  token: string = '';
  constructor(public http: HttpClient, public router: Router, public _subirImagenService: SubirArchivoService) {
    //console.log('Innicializaando usuario service');
    this.cargarStorage();
   }

   renuevaToken(){

    let url = `${URL_SERVICIOS}/login/renuevatoken`;
    url += '?token='+ this.token;

    return this.http.get(url)
                .pipe(map( (resp: any)=>{
                  
                  this.token = resp.token;

                  localStorage.setItem('token', resp.token);
                  console.log("token Renovado");

                  return true;

                } ),catchError(err => {
                  // console.error(err.status);
                  // console.error(err.error.mensaje);
                  this.router.navigate(['/login']);

                  swal("Error", "No se pudo renovar el token", "error");
                  return throwError(err);
                })
              );

   }

   cargarStorage(){
     if(localStorage.getItem('token')){

       this.usuario = JSON.parse(localStorage.getItem('usuario'));
       this.token = localStorage.getItem('token');
       this.menu = JSON.parse(localStorage.getItem('menu'));
     }else{
       this.token = '';
       this.usuario = null;
       this.menu = [];
     }
   }

   estaLogueado(){
     return  this.token.length > 5 ? true : false;
   }

   guardarStorage(id: string, token: string, usuario: Usuario, menu: any){


      localStorage.setItem('id', id);
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));
      localStorage.setItem('menu', JSON.stringify(menu));

      this.usuario = usuario;
      this.token = token;
      this.menu = menu;
   }

   loginGoogle( token: string ){
    //console.log(token);
    let url = `${URL_SERVICIOS}/login/google`;
    
    return this.http.post(url, { token } )
                .pipe(map((resp: any) => {
                  //console.log(resp);            
                  // localStorage.setItem('id', resp.id);
                  // localStorage.setItem('token', resp.token);
                  // localStorage.setItem('usuario', JSON.stringify(resp.usuario));

                  this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
            
                  return true;
            
                }),catchError(err => {
                  // console.error(err.status);
                  // console.error(err.error.mensaje);

                  swal("Error", err.error.mensaje, "error");
                  return throwError(err);
                })
              );

  }

   login(usuario: Usuario, recordar: boolean = false){
    
    let url = `${URL_SERVICIOS}/login`;

    if(recordar){

      localStorage.setItem('email', usuario.email);
      
    }else{

      localStorage.removeItem('email');

    }

    return this.http.post(url, usuario)
                    .pipe(map((resp: any) => {
                      
                      this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);

                      return true;

                    }),catchError(err => {
                      // console.error(err.status);
                      // console.error(err.error.mensaje);

                      swal("Error", err.error.mensaje, "error");
                      return throwError(err);
                    })
                  );
  
  }

  logout(){
    this.usuario= null;
    this.token = '';
    this.menu= [];

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    
    this.router.navigate(['/login']);
  }

   crearUsuario(usuario: Usuario){

    let url = `${URL_SERVICIOS}/usuario`;

    return this.http.post(url, usuario).pipe(map((response: any) => {

      swal("Bien Hecho", "Operación Exitosa", "success");
      return usuario;
      
    }),catchError(err => {
      // console.error(err.status);
      // console.error(err.error.mensaje);

      swal(err.error.mensaje, err.error.errors.message, "error");
      return throwError(err);
    })
    );
   }

   actualizarUsuario(usuario: Usuario){

      //let url = `${URL_SERVICIOS}/usuario/${usuario._id}`;
      let url = URL_SERVICIOS +'/usuario/'+ usuario._id;
      url += '?token='+ localStorage.getItem('token');
      //console.log(url);
      return this.http.put(url, usuario)
                    .pipe(map((resp: any) =>{

                      if(usuario._id === this.usuario._id){

                        let usuarioDb: Usuario = resp.usuario;
                        this.guardarStorage(usuarioDb._id, this.token, usuarioDb, resp.menu);
                      }



                      swal('Usuario Actualizado', usuario.nombre, 'success' );
                      return true;

                    }),catchError(err => {
                      console.error(err);
                      // console.error(err.error.mensaje);
                
                      swal('Error al actualizar role', err.error.mensaje, "error");
                      return throwError(err);
                    })
                    ); 
                    


   }

   cambiarImagen(archivo: File, id: string){
    //console.log('cambiarImagen -- usuarioService');
    this._subirImagenService.subirArchivo(archivo, 'usuarios', id)
                  .then((resp: any) => {
                    //console.log(resp);
                    this.usuario.img = resp.usuario.img;

                    this.guardarStorage(this.usuario._id, this.token, this.usuario, resp.menu);

                    swal('Imagen Actualizada', this.usuario.nombre, 'success' );


                  })
                  .catch( resp => {

                    swal('Hubo un Error al actualizar la foto', this.usuario.nombre, 'error' );

                    console.log(resp);

                  });
    
   }

   cargarUsuarios(desde:number = 0){

    let url = `${URL_SERVICIOS}/usuario/?desde=${desde}`;

    return this.http.get(url);

   }

   buscarUsuarios(termino: string){
    
    let url = `${URL_SERVICIOS}/busqueda/coleccion/usuario/${termino}`;

    return this.http.get(url)
              .pipe(map((resp: any) => resp.usuario)); 

   }

   borrarUsuario(id: string){

    let url = `${URL_SERVICIOS}/usuario/${id}`;
    url += '?token='+ this.token;

    return this.http.delete(url);

   }

   getUsuarioId(id: string){

    let url = `${URL_SERVICIOS}/usuario/userId/${id}`;

    return this.http.get(url)
              .pipe(map((resp: any) => resp.usuario)); 

   }
   

}
