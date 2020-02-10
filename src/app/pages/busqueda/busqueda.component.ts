import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';
import { Paciente } from 'src/app/models/paciente.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[]=[];
  medicos: Medico[]=[];
  hospitales: Hospital[]=[];
  pacientes: Paciente[]=[];


  constructor(
    public activatedRoute: ActivatedRoute,
    public http: HttpClient) {

    activatedRoute.params.subscribe( params => {

      let termino = params['termino'];

      //console.log(termino);

      this.buscar(termino);

    });
   }

  ngOnInit() {

  }

  buscar(termino: string){
    
    let url = `${URL_SERVICIOS}/busqueda/todo/${termino}`;

    this.http.get(url)
             .subscribe((resp: any) => {
               console.log(resp);
               this.usuarios= resp.usuarios;
               this.medicos= resp.medicos;
               this.hospitales= resp.hospitales;
               this.pacientes= resp.pacientes;
             });

  }

}
