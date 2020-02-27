import { Component,ViewChild, ElementRef, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Paciente } from '../../models/paciente.model';
import { UsuarioService, PacienteService } from '../../service/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import swal from 'sweetalert';
import { animacion } from '../../animaciones-angular/animacion.tablas';
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter
} from "rxjs/operators";
import { fromEvent } from 'rxjs';


@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  animations: animacion
})
export class PacientesComponent implements OnInit {

  pacientes: Paciente[] = [] ;
  desde: number = 0;
  totalRegistro: number= 0;
  cargando: boolean = true;

  numeroPaginas: number= 0;
  activePage:number = 1;  
  direccion:any = false;  
  @ViewChild('input') inputBusqueda: ElementRef;
  
  //displayActivePage(activePageNumber:number){  
  displayActivePage(Pageinfo:any){  
 
    this.activePage = Pageinfo.activePage ;
    this.desde = this.activePage == 1 ? 0 : (this.activePage * 5)  - 5;
    this.direccion = Pageinfo.direccion;
    if(Pageinfo.direccion){
      this.cambiarPaginador();
    }
  }
 

  constructor(public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService,
    public _pacienteService: PacienteService,
    private titulo_navegador: Title
    ) { }

  ngOnInit() {
    this.titulo_navegador.setTitle('Cloud H & S | Paciente');
    this.cargarPacientes();
    this._modalUploadService.notificador
            .subscribe( resp => this.cargarPacientes());

    fromEvent(this.inputBusqueda.nativeElement, 'keyup').pipe(
      // get value
      map((event: any) => {
        return event.target.value;
      })
      // if character length greater then 2
      //,filter(res => res.length > 2)
      // Time in milliseconds between key events
      ,debounceTime(300)        
      // If previous query is diffent from current   
      ,distinctUntilChanged()
      // subscription for response
      ).subscribe((termino: string) => {

        this.cargando = true;

        if(termino.length > 0){

          this._pacienteService.buscarPaciente(termino)
          .subscribe( (paciente: Paciente[]) => {

            this.pacientes= paciente;
            this.cargando = false;
          });
        }else{
          this.cargarPacientes();
          this.cargando = false;
        }
  
        
    });

            
  }

  

  cargarPacientes(){
    this.cargando = true;

    this._pacienteService.cargarPaciente(this.desde)
            .subscribe( (resp: any) => {

              this.totalRegistro= resp.total;
 
              this.numeroPaginas= resp.total?(resp.total/5) % 1 == 0 ? resp.total/5:Math.floor(resp.total/5) + 1: 0;
              this.pacientes= resp.pacientes;
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

  
 
    this.cargarPacientes();

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
    this.cargarPacientes();

  }

  //buscarPaciente(termino : string){

    


    // this.cargando = true;

    // if(termino.length > 0){

    //   this._pacienteService.buscarPaciente(termino)
    //   .subscribe( (paciente: Paciente[]) => {

    //     this.pacientes= paciente;
    //     this.cargando = false;
    //   });
    // }else{
    //   this.cargarPacientes();
    //   this.cargando = false;
    // }

    

  //}

  borrarPaciente(paciente: Paciente){
    
  
    swal({
      title: 'Estas Seguro?',
      text: 'Procede a borrar a el Paciente ' + paciente.nombres ,
      icon: 'warning',
      buttons: true,
      dangerMode: true,

    } as any)
    .then(borrar => {

      if(borrar){

        this._pacienteService.borrarPaciente(paciente._id)
      .subscribe( (PacienteBorrado: any) => {

    
        this.cargarPacientes();

        swal('Operación Exitosa', 'Se elimino correctamente el paciente ' + PacienteBorrado.paciente.nombres , 'success');

      });



      }

    })
  }


  mostrarModal(id: string){
    
    this._modalUploadService.mostrarModal('pacientes', id);
  }

  
  

}
