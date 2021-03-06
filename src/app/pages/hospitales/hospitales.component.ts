import { Component, OnInit } from '@angular/core';

import { Hospital } from '../../models/hospital.model';
import { UsuarioService, HospitalService } from 'src/app/service/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { animacion } from '../../animaciones-angular/animacion.tablas';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
 
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  animations: animacion
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  desde: number = 0;
  totalRegistro: number= 0;
  cargando: boolean = true;

  numeroPaginas: number= 0;
  activePage:number = 1;  
  direccion:any = false;  
  

  displayActivePage(Pageinfo:any){  
    console.log(Pageinfo);
    console.log('desde en emiter1',this.desde );
    

    this.activePage = Pageinfo.activePage ;
    this.desde = this.activePage == 1 ? 0 : (this.activePage * 5)  - 5;
    this.direccion = Pageinfo.direccion;
    if(Pageinfo.direccion){
      this.cambiarPaginador();
    }
  }

  constructor(public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService,
    public _hospitalService: HospitalService
    ) { }

  ngOnInit() {

    this.cargarHospitales();
    this._modalUploadService.notificador
            .subscribe( resp => this.cargarHospitales());
  }

  cargarHospitales(){
    this.cargando = true;

    this._hospitalService.cargarHospital(this.desde)
            .subscribe( (resp: any) => {

              this.totalRegistro= resp.total;
              this.numeroPaginas= resp.total?(resp.total/5) % 1 == 0 ? resp.total/5:Math.floor(resp.total/5) + 1: 0;
              this.hospitales= resp.hospitales;
              this.cargando = false;
            });
  }

  cambiarDesde(valor: number){

    let desde = this.desde + valor;

    if(desde >= this.totalRegistro){
      return;
    }

    if(desde < 0){
      return;
    }

    this.desde += valor;
    console.log('desde final',this.desde );
    this.cargarHospitales();

  }
  cambiarPaginador(){

    
    let desde = this.desde ;

    if(desde >= this.totalRegistro){

     return;
       
    }

    if(desde < 0){
      return;
    }

  
    console.log('desde final',this.desde );
    this.cargarHospitales();

  }

  buscarHospital(termino : string){
    
    //console.log(termino);

    this.cargando = true;

    if(termino.length > 0){

      this._hospitalService.buscarHospital(termino)
      .subscribe( (hospital: Hospital[]) => {

        //console.log(resp);

        //this.totalRegistro= resp.total;
        this.hospitales= hospital;
        this.cargando = false;
      });
    }else{
      this.cargarHospitales();
      this.cargando = false;
    }

    

  }

  borrarHospital(hospital: Hospital){
    
  
    swal({
      title: 'Estas Seguro?',
      text: 'Procede a borrar a el hospital ' + hospital.nombre ,
      icon: 'warning',
      buttons: true,
      dangerMode: true,

    } as any)
    .then(borrar => {

      if(borrar){

        this._hospitalService.borrarHospital(hospital._id)
      .subscribe( (HospitalBorrado: any) => {

        //console.log(usuario);
        //this.
        this.cargarHospitales();

        swal('Operación Exitosa', 'Se elimino correctamente el hospital ' + HospitalBorrado.nombre , 'success');
        //this.totalRegistro= resp.total;
        //this.usuarios= usuarios;
        //this.cargando = false;
      });



      }

    })
  }

  actualizarHospital(hospital: Hospital){
    
    swal({
      title: 'Estas Seguro?',
      text: 'Procede a actualizar a el hospital ' + hospital.nombre ,
      icon: 'warning',
      buttons: true,
      dangerMode: true,

    } as any)
    .then(resp => {

      if(resp){

        this._hospitalService.actualizarHospital(hospital)
          .subscribe();



      }

    })
  }

  crearHospital(){

    swal({
      title: 'Crear Hospital',
      text: 'Introduzca el nombre del hospital',
      content: "input",
      icon: "info",
      //buttons: true,
      //dangerMode: true,
      button: {
        text: "Guardar",
        closeModal: true,
      },
    } as any)
    .then((value: string) => {
      if(!value ||  value.length <= 0){

        //swal("Error", "El campo no puede estar vacio", "error");
        return;

      }

      let hospital = new Hospital(value);

      return this._hospitalService.crearHospital(hospital);
      //swal(`You typed: ${value}`);
    }).then((observable: any) => {
      if(!observable){
        return;
      }
      observable.subscribe((resp: any) =>{

        this.cargarHospitales();
        swal('Operación Exitosa', `Se creo correctamente el hospital ${resp.nombre}`, 'success');
      });
                  

    });
  }

  mostrarModal(id: string){
    this._modalUploadService.mostrarModal('hospitales', id);
  }

}
