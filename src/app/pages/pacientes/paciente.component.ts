import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Paciente } from '../../models/paciente.model';
import swal from 'sweetalert';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styles: []
})
export class PacienteComponent implements OnInit {

  paciente: Paciente = new Paciente('', '', '', '', '','xxx','');
  imagenSubir: File;
  imagenTemp: any;
 
  constructor(private titulo_navegador: Title) { }

  ngOnInit() {
    this.titulo_navegador.setTitle('Cloud H & S | Pacientes');
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

}
