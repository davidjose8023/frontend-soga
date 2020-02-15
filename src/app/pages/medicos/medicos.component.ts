import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { UsuarioService, MedicoService } from '../../service/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import { animacion } from '../../animaciones-angular/animacion.tablas';

 
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  animations: animacion
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  desde: number = 0;
  totalRegistro: number= 0;
  cargando: boolean = true;

  numeroPaginas: number= 0;
  activePage:number = 1;  
  direccion:any = false;  

  constructor(public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService,
    public _medicoService: MedicoService
    ) { }

  ngOnInit() {

    this.cargarMedicos();
    this._modalUploadService.notificador
            .subscribe( resp => this.cargarMedicos());
  }

  displayActivePage(Pageinfo:any){  

    this.activePage = Pageinfo.activePage ;
    this.desde = this.activePage == 1 ? 0 : (this.activePage * 5)  - 5;
    this.direccion = Pageinfo.direccion;
    if(Pageinfo.direccion){
      this.cambiarPaginador();
    }
  }

  cargarMedicos(){
    this.cargando = true;

    this._medicoService.cargarMedico(this.desde)
            .subscribe( (resp: any) => {

              //console.log(resp);

              this.totalRegistro= resp.total;
              this.numeroPaginas= resp.total?(resp.total/5) % 1 == 0 ? resp.total/5:Math.floor(resp.total/5) + 1: 0;
              this.medicos= resp.medicos;
              this.cargando = false;
            });
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
    this.cargarMedicos();

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
    this.cargarMedicos();

  }

  buscarMedico(termino : string){
    
    //console.log(termino);

    this.cargando = true;

    if(termino.length > 0){

      this._medicoService.buscarMedico(termino)
      .subscribe( (medico: Medico[]) => {

        //console.log(resp);

        //this.totalRegistro= resp.total;
        this.medicos= medico;
        this.cargando = false;
      });
    }else{
      this.cargarMedicos();
      this.cargando = false;
    }

    

  }

  borrarMedico(medico: Medico){
    
  
    swal({
      title: 'Estas Seguro?',
      text: 'Procede a borrar a el medico ' + medico.nombre ,
      icon: 'warning',
      buttons: true,
      dangerMode: true,

    } as any)
    .then(borrar => {

      if(borrar){

        this._medicoService.borrarMedico(medico._id)
      .subscribe( (MedicoBorrado: any) => {

        //console.log(usuario);
        //this.
        this.cargarMedicos();

        swal('Operación Exitosa', 'Se elimino correctamente el medico ' + MedicoBorrado.nombre , 'success');
        //this.totalRegistro= resp.total;
        //this.usuarios= usuarios;
        //this.cargando = false;
      });



      }

    })
  }


  mostrarModal(id: string){
    this._modalUploadService.mostrarModal('medicos', id);
  }

}
