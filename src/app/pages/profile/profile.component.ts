import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../service/usuario/usuario.service';
import swal from 'sweetalert';
import { trigger,transition,query,style,stagger,animate,keyframes }
from '@angular/animations'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [],
  animations: [
    trigger('listStagger', [
      transition('* <=> *', [
        query(':enter', 
        [
          style({ opacity: 0, transform: 'translateY(-35px)' }),
          stagger('50ms', 
          animate('550ms ease-out',
        style({ opacity: 1, transform: 'translateY(0px)'})))
        ], {optional: true}),
        query(':leave', animate('50ms', style({ opacity: 0 })),{optional: true})
      ])
    ]) 
  ]
})
export class ProfileComponent implements OnInit {
  
  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: any;
  constructor(public _serviceUsuario: UsuarioService) {

    this.usuario = this._serviceUsuario.usuario;
  }

  ngOnInit() {
    console.log('PROFLE::');
  }

  guardar(usuario: Usuario){
    
    //console.log(usuario);

    this.usuario.nombre = usuario.nombre;

    if(!this.usuario.google)
    this.usuario.email = usuario.email;

    this._serviceUsuario.actualizarUsuario(this.usuario)
                  .subscribe( resp =>{
                      console.log(resp);
                  });
  }

  seleccionImagen( archivo: File ){
    console.log(archivo);

    if(!archivo){
      this.imagenSubir= null;
      return;
    }

    if(archivo.type.indexOf('image') < 0){
      this.imagenSubir= null;
      swal('Solo Imagenes','Imagen no valida', 'error');
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onload = () => this.imagenTemp = reader.result;
    //this.imagenTemp = archivo;

  }

  cambiarImagen(){  
    console.log('cambiarImagen profileCompone');
    this._serviceUsuario.cambiarImagen(this.imagenSubir, this.usuario._id);
  }

}
