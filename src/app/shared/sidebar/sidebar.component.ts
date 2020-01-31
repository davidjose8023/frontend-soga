import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService } from 'src/app/service/service.index';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  public menu : any = [];
  public usuario: Usuario;

  constructor(public _serviceSidebar: SidebarService, public _usuarioService: UsuarioService) { }

  ngOnInit() {
    this.menu = this._serviceSidebar.cargarMenu();
    this.usuario = this._usuarioService.usuario;
    //console.log("this.menu");
    //console.log(this.menu);
  }

}
