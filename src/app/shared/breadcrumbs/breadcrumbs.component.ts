import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser'


@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {
  titulo: string;
  constructor(private router: Router, private titulo_navegador: Title, private meta: Meta) { 

    
    this.getDataRoute().subscribe(event =>{
      //console.log(event);
      this.titulo = event.titulo;
      this.titulo_navegador.setTitle('Cloud H & S | '+ event.titulo);
      const metaTag : MetaDefinition ={

        name: 'descripción',
        content: event.titulo
      };
      
      meta.updateTag(metaTag);
    });
  }

  ngOnInit() {
  }

  getDataRoute(){
    return this.router.events.pipe(
      filter( evento => evento instanceof ActivationEnd),
      filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null),
      map( (evento: ActivationEnd) => { return evento.snapshot.data})
      );
  }

}
