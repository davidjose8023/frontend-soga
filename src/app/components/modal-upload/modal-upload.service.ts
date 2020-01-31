import { Injectable, EventEmitter } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';
import { HospitalService } from '../../service/hospital/hospital.service';
import { Hospital } from '../../models/hospital.model';
import { MedicoService } from '../../service/medico/medico.service';
import { PacienteService } from '../../service/paciente/paciente.service';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public tipo: string;
  public id: string;
  public oculto: string = 'oculto';
  public notificador =  new EventEmitter<any>();
  public usuario: Usuario;
  public img: any;
  
  constructor(public _serviceUsuario: UsuarioService, 
    public _hospitalService: HospitalService,
    public _pacienteService: PacienteService,
    public _medicoService: MedicoService) {

    //console.log("modal servico");
   }

   ocultarModal(){
    this.oculto = 'oculto';
    this.tipo= null;
    this.id= null;
   }
   
   mostrarModal(tipo: string, id: string){

    this.oculto = '';
    this.tipo = tipo;
    this.id = id;
    switch (tipo) {
      case 'usuarios':
          this._serviceUsuario.getUsuarioId(id)
          .subscribe( (resp: Usuario) => {
   
            this.usuario = resp;
            this.img = resp.img;
            

          } );
        break;
      case 'medicos':
          this._medicoService.obtenerMedico(id)
          .subscribe( (resp: any) => {
    
            
            this.img = resp.medico.img;
            

          } );
        break;

      case 'pacientes':
          this._pacienteService.obtenerPaciente(id)
          .subscribe( (resp: any) => {
    
            
            this.img = resp.paciente.img;
            

          } );
        break;
      case 'hospitales':
        this._hospitalService.obtenerHospital(id)
        .subscribe( (resp: any) => {
          //console.log(resp);
          this.img = resp.hospital.img;
          

        } );
      break;
    
      default:
        break;
    }
    
  
   }
}
