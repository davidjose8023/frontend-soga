import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Paciente } from '../../models/paciente.model';
import swal from 'sweetalert';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styles: []
})
export class PacienteComponent implements OnInit {

  paciente: Paciente = new Paciente('', '', '', '', '','','','xxx','','');
  imagenSubir: File;
  imagenTemp: any;
  forma : FormGroup;
 
  constructor(private titulo_navegador: Title) { }
  validar(campo1: string){
  
    return (group: FormGroup) => {
      let nombre = group.controls[campo1].value;
     
      
      if(nombre){
          if(nombre.length < 2){

            return null;
          }

        
      }
      if(!nombre){

        return null;
      }

      return {
        validacion: true
      }
    }
  }
  ngOnInit() {
    this.titulo_navegador.setTitle('Cloud H & S | Pacientes');
    this.forma = new FormGroup({
      
      nombres: new FormControl(null, Validators.required),
      apellidos: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.email]),
      rut: new FormControl(null, Validators.required),
      telefono: new FormControl(null, Validators.required)
    }, this.validar('nombres'));
  }

  

  crearPaciente(){

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
