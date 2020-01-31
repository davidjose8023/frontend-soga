import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';
 

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {

  constructor(public _usuarioService: UsuarioService,  public router: Router){

  }
  canActivate(): Promise<boolean> | boolean {

    //console.log("inicio de verifica token");

    let token = this._usuarioService.token;
    let payload = JSON.parse( atob(token.split('.')[1]));

    //console.log(payload);

    let expirado = this.expirado(payload.exp);

    if(expirado){
      this.router.navigate(['/login']);
      return false;

    }
    
    return this.verificaRenueva(payload.exp);
  }

  verificaRenueva(fechaExp: number): Promise<boolean> {

    return new Promise( (resolve, reject) =>{

      let tokenExp = new Date(fechaExp * 1000);
      let ahora = new Date();

      ahora.setTime(ahora.getTime() + (1 * 60 * 60 * 1000 ));// se genera la hora actual mas una hora mas 

      if(tokenExp.getTime() > ahora.getTime()){// se valida que la hora del token este a una hora de expirar
        resolve(true);
      }else{// si la hora del token es mayor es porque esta a una hora de expirar y se debe renovar

        this._usuarioService.renuevaToken()
                      .subscribe( () => {
                        resolve(true);
                      }, () => {
                          this.router.navigate(['/login']);
                          reject(false);
                      });

      }

      resolve(true);

    });

  }

  expirado(tiempoExp: number){

    let horaActualEnSegundo = new Date().getTime() / 1000;

    if(tiempoExp < horaActualEnSegundo ){
      return true;
    }else{
      return false;
    }
  }
  
}
