import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { CitaMedicaService, MedicoService  } from 'src/app/service/service.index';
import { Cita } from '../../models/cita.model';
import { rowsAnimation } from '../../animaciones-angular/animacion.row';
import { HospitalService } from '../../service/hospital/hospital.service';
import { EspecialidadesMedicas } from "../../data/especialidades.interface";
import { CrearCitaWizardComponent } from "../../components/crear-cita-wizard/crear-cita-wizard.component";
import { Medico } from "../../models/medico.model";
declare function init_calendar(event);
declare function scroll();


@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css'],
  animations: [rowsAnimation]
})
export class AgendaComponent implements OnInit {
  event : any = [];
  citaModel: Cita  = new Cita('','','','','','','','','');
  medico: string;
  especialidades: EspecialidadesMedicas[]= [];
  disabledNext: boolean;
  disabledPrevious: boolean;
  buttonGuardar: boolean = false;
  validacion: boolean= true;
  seccion: number = 1;
  cargandoMedico: boolean= false;
  medicos: Medico[]=[];

  @ViewChild(CrearCitaWizardComponent) crearCitaWisard : CrearCitaWizardComponent;


  /* [{
    title: 'Cita Médica',
    start: new Date('2020-03-08 18:30'),
    className: 'bg-info'
}, {
    title: 'This is today check date',
    start: moment().utc().format('YYYY-MM-DD HH:mm:ss'),
    end: moment().utc().format('YYYY-MM-DD HH:mm:ss'),
    className: 'bg-danger'
}]; */

  constructor(private _citaService: CitaMedicaService,
    public _hospitalservice: HospitalService,
    public _medicoService: MedicoService){
    this.disabledPrevious = true;
    this.disabledNext = false;
 
   }

  ngOnInit() {

    this.getAllCitas();
    
    this._hospitalservice.especialidadesMedicas()
        .subscribe( (especialidades: EspecialidadesMedicas[]) => 
        {this.especialidades = especialidades; this.cargarMedicos();});

    setTimeout(() => {
      scroll();
    }, 2000);
    

    
  }

  setDataWizard(data: any){
    this.buttonGuardar= data.buttonGuardar;
    this.disabledNext= data.disabledNext;
    this.disabledPrevious= data.disabledPrevious;
    this.seccion= data.seccion;
    console.log(data.seccion);

  }

  getAllCitas(){

    this._citaService.obtenerCitas()
          .subscribe( (citas: any) => {
            console.log(citas);

            
            citas.forEach((element, index) => {
              
              // this.event.push({
              //   start: element.start,
              //   end: element.end,
              //   title: element.nombres,
              //   className: 'bg-info',
              //   _id: element._id
              //  });

              citas[index]['title']= element.nombres

            });
          
            this.event = citas;
            init_calendar(this.event);
   
          });

  }
  anterior(referenciaWizard){
    
    referenciaWizard.anterior();

    
  }
  siguiente(referenciaWizard){

    if(this.seccion == 1){

      if(this.citaModel.nombres && this.citaModel.rut && this.citaModel.telefono ){
        referenciaWizard.siguiente();
      }

    }

  }
  crearCitaMedica(){

    console.log("crear Cita");
    this.crearCitaWisard.final();

  }

  cargarMedicos(){
    this.cargandoMedico = true;

    this._medicoService.cargarMedico(0)
            .subscribe( (resp: any) => {
              let medicos = resp.medicos; 
              
              
              medicos.forEach((element, index )=> {

                this.especialidades.forEach(element2 => {

                  if(element2._id == element.especialidad){

                    medicos[index]['especialidad']= element2.nombre;

                  }
                  
                });
                
                
                
              });

              console.log(medicos);
              
              this.medicos= medicos;
              this.cargandoMedico = false;
            });
  }
  getMedico(){

  }

}
