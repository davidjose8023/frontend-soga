import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Paciente } from '../../models/paciente.model';
import swal from 'sweetalert';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PacienteService, PatologiaService } from 'src/app/service/service.index';
import { Router, ActivatedRoute } from '@angular/router';
//import { debounceTime } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { trigger,transition,query,style,stagger,animate,keyframes }
from '@angular/animations'
import { rowsAnimation } from '../../animaciones-angular/animacion.row';
 
declare function init_form();
declare function getvalueSelect();
declare function setvalueSelect(valor);

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
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
    ]),
    rowsAnimation 
  ]
})
export class PacienteComponent implements OnInit {

  paciente: Paciente = new Paciente('', '', '', '', '','','','xxx','','');
  imagenSubir: File;
  imagenTemp: any;
  forma : FormGroup;
  patologias : any[]=[];
  patologia: any;
  selected = [];
 
  @ViewChild('inputFecha') inputFecha : ElementRef;
  @ViewChild('selectEnfermedad') selectEnfermedad : ElementRef;
 
  nombresValidado: any = {has_danger:'', form_control_danger:''};
  apellidosValidado: any = {has_danger:'', form_control_danger:''};
  rutValidado: any = {has_danger:'', form_control_danger:'', msj:''};
  correoValidado: any = {has_danger:'', form_control_danger:'', msj:''};
  telefonoValidado: any = {has_danger:'', form_control_danger:'', msj:''};
  fechaNacimientoValidado: any = {has_danger:'', form_control_danger:'', msj:''};
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(
    private titulo_navegador: Title, 
    private _pacienteService: PacienteService,
    private _patologiaService: PatologiaService,
    public router: Router,
    public activateRoute: ActivatedRoute,
    private datePipe: DatePipe) 
    { 
      
    
      this.titulo_navegador.setTitle('Cloud H & S | Pacientes');
    
      

      this.formGroupValidation();
    }



  get nombres(){return this.forma.get('nombres')}
  get apellidos(){return this.forma.get('apellidos')}
  get rut(){return this.forma.get('rut')}
  get telefono(){return this.forma.get('telefono')}
  get correo(){return this.forma.get('correo')}
  get sexo(){return this.forma.get('sexo')}
  get ec(){return this.forma.get('ec')}
  get fecha_nacimiento(){return this.forma.get('fecha_nacimiento')}
  //get patologia(){return this.forma.get('patologia')}
  

  ngOnInit() {
    init_form();
 
    this._patologiaService.enfermedadXCategoria().subscribe((resp:any) => {
      console.log(resp);
      this.patologias = resp;
    
    });
    this.activateRoute.params.subscribe(params => {

      if(params['id'] !== 'nuevo'){
        this.getPacienteId(params['id']);
        
      }

    });
  
 
  }
 

  validacion(campo1: string, campo2: string, campo3: string, campo4:string, campo5: string, campo6:string){

    return (group: FormGroup) => {
      let nombre = group.controls[campo1];
      let apellido = group.controls[campo2];
      let correo = group.controls[campo3];
      let rut = group.controls[campo4];
      let telefono = group.controls[campo5];
      let fecha_nacimiento = group.controls[campo6];
      let respuesta= null;
     
       
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

          respuesta = { validacion: true }
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
        
        respuesta = { validacion: true }
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
          
          
        respuesta = { validacion: true }
      }
      if(telefono.invalid){
        //console.log(apellido);
        this.telefonoValidado.has_danger= 'form-group has-danger';
        this.telefonoValidado.form_control_danger= 'form-control form-control-danger';

        if(telefono.errors.required)
          this.telefonoValidado.msj= 'El telefono es requerido';
        
        if(telefono.errors.minlength)
          this.telefonoValidado.msj= 'El telefono es muy corto';
          
        if(telefono.errors.maxlength)
          this.telefonoValidado.msj= 'El telefono es muy largo';
        
        respuesta = { validacion: true }
      }
      if(correo.invalid){
        //console.log(correo);
        this.correoValidado.has_danger= 'form-group has-danger';
        this.correoValidado.form_control_danger= 'form-control form-control-danger';

        if(correo.errors.required)
          this.correoValidado.msj= 'El correo es requerido';
        
        if(correo.errors.pattern)
          this.correoValidado.msj= 'El correo no es valido';
        
        respuesta = { validacion: true }
      }
       
      if(fecha_nacimiento.invalid){
        
        
        this.fechaNacimientoValidado.has_danger= 'form-group has-danger';
        this.fechaNacimientoValidado.form_control_danger= 'form-control form-control-danger';

        if(fecha_nacimiento.errors.required)
          this.fechaNacimientoValidado.msj= 'La fecha es requerida';
        
        respuesta = { validacion: true }
        
      }
      

      return respuesta;
    }
  }


  formGroupValidation(){

    
    this.forma = new FormGroup({
      
      nombres: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(30)]),
      apellidos: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(30)]),
      correo: new FormControl(null, [Validators.required, Validators.pattern(this.emailPattern)]),
      rut: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(8)]),
      fecha_nacimiento: new FormControl(null, Validators.required),
      //patologia: new FormControl(null),
      sexo: new FormControl(null),
      ec: new FormControl(null),
      telefono: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(8)])
    }, this.validacion('nombres','apellidos','correo','rut','telefono', 'fecha_nacimiento'));

    this.sexo.setValue(0);
    this.ec.setValue(0);
    //this.forma.controls['fecha_nacimiento'].setErrors({required: true});
    
  
 

    // this.forma.valueChanges
    // .pipe(
    //   debounceTime(500)
    // )
    // .subscribe(value => {
    //   console.log(value);
    // });
  }

  getPacienteId( id: string ){

    this._pacienteService.obtenerPaciente(id)
          .subscribe( (resp: any) => {
            //console.log(resp);
            this.paciente= resp.paciente;
     
            this.nombres.setValue(resp.paciente.nombres);
            this.apellidos.setValue(resp.paciente.apellidos);
            this.sexo.setValue(resp.paciente.sexo);
            this.ec.setValue(resp.paciente.ec);
            this.telefono.setValue(resp.paciente.telefono);
            this.rut.setValue(resp.paciente.rut);
            this.correo.setValue(resp.paciente.email);
            //this.fecha_nacimiento.setValue(this.datePipe.transform(resp.paciente.fecha_nacimiento,"dd/MM/yyyy"));
            if(resp.paciente.fecha_nacimiento){
              this.fecha_nacimiento.setValue(resp.paciente.fecha_nacimiento);
            }
            
            this.selected = resp.paciente.patologia
            //setvalueSelect(resp.paciente.patologia);
   
          });

  }



  activeDiryOnForm()
{
    let inputAryVar = this.forma.controls
    for(let keyVar in inputAryVar)
    {
        //inputAryVar[keyVar].markAsTouched();
        inputAryVar[keyVar].markAsDirty();
    }
}
onFocusOut(event) {
  //this.input$.skipLast(1);
 // do http request in service immediately 
 setTimeout(()=>{    //<<<---    using ()=> syntax
  this.fecha_nacimiento.setValue(event.target.value);
  }, 300);
}

crearPaciente(){
    console.log(this.selected);
    if(this.inputFecha.nativeElement.value){
      this.fecha_nacimiento.setValue(this.inputFecha.nativeElement.value);
    }
  
   
     
    //this.patologia = getvalueSelect();
  
    
 
    //console.log(this.forma);
   

    if(this.forma.invalid){
      this.activeDiryOnForm();

    
      swal("Error", "Verifica los datos del formulario", "error");
      return;
    }

    if(this.forma.valid){

      let pacienteForm = new Paciente();

      pacienteForm.nombres = this.forma.value.nombres;
      pacienteForm.apellidos = this.forma.value.apellidos;
      pacienteForm.telefono = this.forma.value.telefono;
      pacienteForm.sexo = this.forma.value.sexo;
      pacienteForm.rut = this.forma.value.rut;
      pacienteForm.email = this.forma.value.correo;
      pacienteForm.ec = this.forma.value.ec;
      pacienteForm.fecha_nacimiento = this.forma.value.fecha_nacimiento;
      pacienteForm.patologia = this.selected;
      //pacienteForm.patologia = this.patologia;
      if(this.paciente._id){
        pacienteForm.usuario = this.paciente.usuario;
        pacienteForm._id = this.paciente._id;
        pacienteForm.img = this.paciente.img;
      }
    
      console.log(pacienteForm);
      this._pacienteService.guardarPaciente(pacienteForm)
      .subscribe( paciente => {
      
        this.paciente._id =  paciente._id;
        this.paciente.nombres=paciente.nombres;

        if(this.imagenSubir && !paciente.img){

          this._pacienteService.cambiarImagenNuevo(this.imagenSubir, this.paciente._id);
        }
        
        
        if(paciente._id){

          swal('Operación Satisfacia', paciente.nombres, 'success');
          this.router.navigate(['/paciente', paciente._id]);
        }

        
      });

    }
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
