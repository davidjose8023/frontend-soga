import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardsGuard implements CanActivate {

  constructor(public _usuarioService: UsuarioService, public router: Router){

  }
  canActivate(){
    
    if(this._usuarioService.estaLogueado()){
      //console.log('paso el guards');

      return true;
    }else{
      console.log('Bloqueado por el guards');
      this.router.navigate(['/login']);
      return false;
    }

  }
    
    
    
 
  
}
