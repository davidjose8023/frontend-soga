import { Component, OnInit } from '@angular/core';

import { CitaMedicaService  } from 'src/app/service/service.index';
import { Cita } from '../../models/cita.model';
import * as moment from 'moment';
import { rowsAnimation } from '../../animaciones-angular/animacion.row';
declare function init_calendar(event);

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  animations: [rowsAnimation]
})
export class AgendaComponent implements OnInit {
  event : any = [];
  citaModal: Cita;

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

  constructor(private _citaService: CitaMedicaService) { }

  ngOnInit() {

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

}
