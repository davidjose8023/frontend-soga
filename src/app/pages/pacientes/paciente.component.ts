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
  nombresValidado: any = {has_danger:'', form_control_danger:'', msj:''};
  apellidosValidado: any = {display:'', msj:''};
  rutValidado: any = {display:'', msj:''};
  correolValidado: any = {display:'', msj:''};
  telefonoValidado: any = {display:'', msj:''};
 
 

 
  constructor(private titulo_navegador: Title) { }
  validar(campo1: string, campo2: string, campo3: string, campo4:string, campo5: string){
  
    return (group: FormGroup) => {
      let nombre = group.controls[campo1].value;
      let apellido = group.controls[campo2].value;
      let correo = group.controls[campo3].value;
      let rut = group.controls[campo4].value;
      let telefono = group.controls[campo5].value;
     
  
      if(nombre){
    
        return null;
    
      }else{
        
        this.nombresValidado.msj= 'El nombre es requerido';
        this.nombresValidado.has_danger = `form-group has-danger`;
        this.nombresValidado.form_control_danger = `form-control has-danger`;
      }

      if(apellido){
    
        return null;
    
      }else{
        this.apellidosValidado.display= 'block';
        this.apellidosValidado.msj= 'El apellido es requerido';
      }     

      if(correo){
    
        return null;
    
      }else{
        this.correolValidado.display= 'block';
        this.correolValidado.msj= 'El correo es requerido';
      }
      if(rut){
    
        return null;
    
      }else{
        this.rutValidado.display= 'block';
        this.rutValidado.msj= 'El rut es requerido';
      }
      if(telefono){
    
        return null;
    
      }else{
        this.telefonoValidado.display= 'block';
        this.telefonoValidado.msj= 'El telefono es requerido';
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
    }, this.validar('nombres','apellidos','correo','rut','telefono'));
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
