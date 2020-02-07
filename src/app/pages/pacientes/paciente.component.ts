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
  apellidosValidado: any = {has_danger:'', form_control_danger:'', msj:''};
  rutValidado: any = {has_danger:'', form_control_danger:'', msj:''};
  correolValidado: any = {has_danger:'', form_control_danger:'', msj:''};
  telefonoValidado: any = {has_danger:'', form_control_danger:'', msj:''};
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

 
 

 
  constructor(private titulo_navegador: Title) { }
  validacion(campo1: string, campo2: string, campo3: string, campo4:string, campo5: string){

    return (group: FormGroup) => {
      let nombre = group.controls[campo1];
      let apellido = group.controls[campo2];
      let correo = group.controls[campo3];
      let rut = group.controls[campo4];
      let telefono = group.controls[campo5];
     
       
      if(nombre.invalid){
        // console.log(nombre);
        this.nombresValidado.has_danger= 'form-group has-danger';
        this.nombresValidado.form_control_danger= 'form-control form-control-danger';

        if(nombre.errors.required)
          this.nombresValidado.msj= 'El nombre es requerido';
        
        if(nombre.errors.minlength)
          this.nombresValidado.msj= 'El nombre es muy corto';
          
        if(nombre.errors.maxlength)
          this.nombresValidado.msj= 'El nombre es muy largo';
        
      }
      if(apellido.invalid){
        //console.log(apellido);
        this.apellidosValidado.has_danger= 'form-group has-danger';
        this.apellidosValidado.form_control_danger= 'form-control form-control-danger';

        if(apellido.errors.required)
          this.apellidosValidado.msj= 'El apellido es requerido';
        
        if(apellido.errors.minlength)
          this.apellidosValidado.msj= 'El apellido es muy corto';
          
        if(apellido.errors.maxlength)
          this.apellidosValidado.msj= 'El apellido es muy largo';
        
      }
      if(rut.invalid){
        //console.log(apellido);
        this.rutValidado.has_danger= 'form-group has-danger';
        this.rutValidado.form_control_danger= 'form-control form-control-danger';

        if(rut.errors.required)
          this.rutValidado.msj= 'El rut es requerido';
        
        if(rut.errors.minlength)
          this.rutValidado.msj= 'El rut es muy corto';
          
        if(rut.errors.maxlength)
          this.rutValidado.msj= 'El rut es muy largo';
        
      }
      

      return { validacion: true }
    }
  }
  get nombres(){return this.forma.get('nombres')}
  get apellidos(){return this.forma.get('apellidos')}
  get rut(){return this.forma.get('rut')}
  get telefono(){return this.forma.get('telefono')}
  get correo(){return this.forma.get('correo')}

  ngOnInit() {
    this.titulo_navegador.setTitle('Cloud H & S | Pacientes');
    this.forma = new FormGroup({
      
      nombres: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(30)]),
      apellidos: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(30)]),
      correo: new FormControl(null, [Validators.required, Validators.pattern(this.emailPattern)]),
      rut: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(8)]),
      telefono: new FormControl(null, [Validators.required])
    }, this.validacion('nombres','apellidos','correo','rut','telefono'));
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
