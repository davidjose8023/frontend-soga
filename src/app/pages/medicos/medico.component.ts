import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../service/hospital/hospital.service';
import { MedicoService } from '../../service/medico/medico.service';
import swal from 'sweetalert';
import { UsuarioService } from '../../service/usuario/usuario.service';
import { SubirArchivoService } from '../../service/subir-archivo/subir-archivo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EspecialidadesMedicas } from "../../data/especialidades.interface";


@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {
  
  medico: Medico = new Medico('', '', '', '', '');
  hospitales: Hospital[]= [];
  especialidadesMedicas: EspecialidadesMedicas[]= [];
  hospital: Hospital = new Hospital('');
  imagenSubir: File;
  imagenTemp: any;

  constructor(public _hospitalservice: HospitalService, 
    public _medicoService: MedicoService,
    public _usuarioService: UsuarioService,
    public _subirImagenService: SubirArchivoService,
    public _hospitalService: HospitalService,
    public router: Router,
    public activateRoute: ActivatedRoute) { }

  ngOnInit() {

    this._hospitalservice.cargarHospitalAll()
        .subscribe( (hospitales: Hospital[]) => this.hospitales = hospitales);
    this._hospitalservice.especialidadesMedicas()
        .subscribe( (especialidades: EspecialidadesMedicas[]) => {this.especialidadesMedicas = especialidades; console.log(this.especialidadesMedicas);});


    this.activateRoute.params.subscribe(params => {

      if(params['id'] !== 'nuevo'){
        this.getMedicoId(params['id']);
        
      }

    });
  }

  getMedicoId( id: string ){

    this._medicoService.obtenerMedico(id)
          .subscribe( (resp: any) => {
            //console.log(resp);
            this.medico= resp.medico;
            this.cambiarImgHospital(resp.medico.hospital);
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
    //console.log('cambiarImagen profileCompone');
    this._medicoService.cambiarImagen(this.imagenSubir, this.medico._id);
  }

  guardarMedico(f: NgForm){
    
    this.medico.usuario = this._usuarioService.usuario._id;

    if(this.medico._id){
      
      this.medico.img = this.medico.img;
    }
    
    this._medicoService.guardarMedico( this.medico)
        .subscribe( medico => {
          //console.log(medico);
          this.medico._id=  medico._id;
 

        if(this.imagenSubir && !medico.img){

          this._medicoService.cambiarImagenNuevo(this.imagenSubir, this.medico._id);
        }
          
          //this.hospital=  medico.hospital;

          
     
          swal('Operación Satisfacia', this.medico.nombre, 'success');

          this.router.navigate(['/medico', medico._id]);
          
        })

  }

  cambiarImgHospital(id: string){

    //console.log(event);
    if(id){

      this._hospitalService.obtenerHospital(id)
          .subscribe( (resp: any) => {
            //console.log(resp);
            this.hospital = resp.hospital;
            
  
          });
    }else{
      this.hospital.img = 'xxx';
    }
  }

}
