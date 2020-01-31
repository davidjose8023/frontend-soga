import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from 'src/app/service/service.index';
//import   swal from 'sweetalert';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
 
const swal: SweetAlert = _swal as any;
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

//declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  
  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistro: number= 0;
  cargando: boolean = true;
  constructor(public _usuarioService: UsuarioService,public _modalUploadService: ModalUploadService) { }

  ngOnInit() {

    this.cargarUsuarios();
    this._modalUploadService.notificador
            .subscribe( resp => this.cargarUsuarios());
  }

  cargarUsuarios(){

    this.cargando = true;

    this._usuarioService.cargarUsuarios(this.desde)
            .subscribe( (resp: any) => {

              //console.log(resp);

              this.totalRegistro= resp.total;
              this.usuarios= resp.usuarios;
              this.cargando = false;
            });

  }

  cambiarDesde(valor: number){

    let desde = this.desde + valor;
    //console.log(desde);

    if(desde > this.totalRegistro){
      return;
    }

    if(desde < 0){
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();

  }

  buscarUsuarios(termino : string){
    
    //console.log(termino);

    this.cargando = true;

    if(termino.length > 0){

      this._usuarioService.buscarUsuarios(termino)
      .subscribe( (usuarios: Usuario[]) => {

        //console.log(resp);

        //this.totalRegistro= resp.total;
        this.usuarios= usuarios;
        this.cargando = false;
      });
    }else{
      this.cargarUsuarios();
      this.cargando = false;
    }

    

  }

  borrarUsuario(usuario: Usuario){
    
    if(usuario._id == this._usuarioService.usuario._id){
  
      swal('Operación negada', 'No puede Borrarse asi mismo', 'error');
      return;
    }

    swal({
      title: 'Estas Seguro?',
      text: 'Procede a borrar a el usuario ' + usuario.nombre ,
      icon: 'warning',
      buttons: true,
      dangerMode: true,

    } as any)
    .then(borrar => {

      if(borrar){

        this._usuarioService.borrarUsuario(usuario._id)
      .subscribe( (usuarioBorrado: any) => {

        //console.log(usuario);
        this.cargarUsuarios();

        swal('Operación Exitosa', 'Se elimino correctamente el usuario ' + usuarioBorrado.nombre , 'success');
        //this.totalRegistro= resp.total;
        //this.usuarios= usuarios;
        //this.cargando = false;
      });



      }

    })
  }

  actualizarUsuario(usuario: Usuario){
    
    swal({
      title: 'Estas Seguro?',
      text: 'Procede a actualizar a el usuario ' + usuario.nombre ,
      icon: 'warning',
      buttons: true,
      dangerMode: true,

    } as any)
    .then(resp => {

      if(resp){

        this._usuarioService.actualizarUsuario(usuario)
          .subscribe();



      }

    })
  }

  mostrarModal(id: string){
    this._modalUploadService.mostrarModal('usuarios', id);
  }

}
