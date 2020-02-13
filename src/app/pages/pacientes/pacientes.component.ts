import { Component, OnInit } from '@angular/core';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
  state,
  keyframes
} from "@angular/animations";
import { Title } from '@angular/platform-browser';
import { Paciente } from '../../models/paciente.model';
import { UsuarioService, PacienteService } from '../../service/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import swal from 'sweetalert';


@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  animations: [
    trigger("listAnimation", [
      transition("* => *", [
        // each time the binding value changes
        query(
          ":leave",
          //[stagger(100, [animate("0.5s", style({ opacity: 0 }))])],
          stagger(50, [
            animate('300ms ease-out', style({ opacity: 0, width: '0px' })),
          ]),
          { optional: true }
        ),
        query(
          ":enter",
          [
            style({ opacity: 0 }),
            //stagger(100, [animate("0.5s", style({ opacity: 1 }))])
            stagger(50, [
              animate('300ms ease-out', style({ opacity: 1, width: '*' })),
            ]),

          ],
          { optional: true }
        )
      ])
    ]),
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateY(100%)', opacity: 0}),
          animate('500ms', style({transform: 'translateY(0)', opacity: 1, 'overflow-y': 'hidden'}))
        ]),
        transition(':leave', [
          style({transform: 'translateY(0)', opacity: 1}),
          animate('500ms', style({transform: 'translateY(100%)', opacity: 0}))
        ])
      ]
    ),
    trigger('slideIn', [
      state('*', style({ 'overflow-x': 'hidden' })),
      state('void', style({ 'overflow-x': 'hidden' })),
      transition('* => void', [
        style({ height: '*' }),
        animate(250, style({ height: 0 }))
      ]),
      transition('void => *', [
        style({ height: '0' }),
        animate(250, style({ height: '*' }))
      ])
    ])
  ]
})
export class PacientesComponent implements OnInit {

  pacientes: Paciente[] = [] ;
  desde: number = 0;
  totalRegistro: number= 0;
  cargando: boolean = true;

  numeroPaginas: number= 0;
  activePage:number = 1;  
  direccion:any = false;  
  
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

  buscarPaciente(termino : string){


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
