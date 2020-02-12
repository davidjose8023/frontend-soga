import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Paciente } from '../../models/paciente.model';
import { UsuarioService, PacienteService } from '../../service/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import swal from 'sweetalert';


@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styles: []
})
export class PacientesComponent implements OnInit {

  pacientes: Paciente[] = [] ;
  desde: number = 0;
  totalRegistro: number= 0;
  numeroPaginas: number= 0;
  cargando: boolean = true;
  
  activePage:number = 0;  
  
  //displayActivePage(activePageNumber:number){  
  displayActivePage(Pageinfo:any){  
    console.log(Pageinfo);
    //this.activePage = activePageNumber;
    this.activePage = Pageinfo.activePage ;
    if(Pageinfo.direccion){
      if(Pageinfo.direccion == 'prev' ){
  
        this.cambiarDesde((this.activePage * 5) * (-1));
      }
      if(Pageinfo.direccion == 'next' ){
        this.cambiarDesde(this.activePage * 5);
      }
      if(Pageinfo.direccion == 'fija' ){

        if((this.activePage * 5) < this.desde  ){

          this.cambiarDesde((this.activePage * 5) * (-1));
        }

        if((this.activePage * 5) > this.desde  ){
          this.cambiarDesde(this.activePage * 5);
        }
      }

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

  cambiarDesde(valor: number){

    let desde = this.desde + valor;
    console.log(valor);
    console.log(desde);

    if(desde > this.totalRegistro){
      return;
    }

    if(desde < 0){
      return;
    }

    this.desde += valor;
    this.cargarPacientes();

  }

  buscarPaciente(termino : string){
    
    //console.log(termino);

    this.cargando = true;

    if(termino.length > 0){

      this._pacienteService.buscarPaciente(termino)
      .subscribe( (paciente: Paciente[]) => {

        //console.log(resp);

        //this.totalRegistro= resp.total;
        this.pacientes= paciente;
        this.cargando = false;
      });
    }else{
      this.cargarPacientes();
      this.cargando = false;
    }

    

  }

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

        //console.log(PacienteBorrado);
        //this.
        this.cargarPacientes();

        swal('Operación Exitosa', 'Se elimino correctamente el paciente ' + PacienteBorrado.paciente.nombres , 'success');
        //this.totalRegistro= resp.total;
        //this.usuarios= usuarios;
        //this.cargando = false;
      });



      }

    })
  }


  mostrarModal(id: string){
    
    this._modalUploadService.mostrarModal('pacientes', id);
  }

  
  

}
